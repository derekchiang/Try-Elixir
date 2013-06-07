defmodule Safe do
  # TODO: come up with a list of banned modules
  # TODO: Add documentation to this module
  @banned_modules [Code, System, IO, File, :os, :compiler, :mnesia, :odbc, :inets, :wx, :hipe, :stdlib]

  def eval(string) do
    { :ok, ast } = Code.string_to_ast(string)
    { res, _ }   = Code.eval_quoted prune(ast, __ENV__,
      @banned_modules)
    res
  end

  def prune({ { :., _, [module, _] } = dot, meta, args } = tree, caller, banned) do
    module = Macro.expand(module, caller)
    if is_atom(module) do
      if not (module in banned) do
        { dot, meta, prune(args, caller, banned) }
      else
        raise "Calls to #{inspect module} are not allowed for security reasons :P"
      end
    else
      raise "Invalid call expression #{inspect Macro.to_binary(tree)}"
    end
  end

  def prune({ { :., meta, args} = dot, outer_meta, outer_args } = tree, caller, banned) do
    {{:., meta, prune(args, caller, banned)}, outer_meta, outer_args}
  end

  def prune({[], other}, caller, banned) do
    {[], prune(other, caller, banned)}
  end

  @banned_macros_and_functions [:import, :apply, :spawn, :receive]

  def prune({dot, _meta, _args}, _caller, _banned)
    when dot in @banned_macros_and_functions do
    raise "#{dot} is not allowed for security reasons :P"
  end

  @meta_atoms [:__block__, :=, :fn, :"->"]

  def prune({dot, meta, args} = tree, caller, banned)
    when dot in @meta_atoms do
    { dot, meta, prune(args, caller, banned) }
  end

  def prune([do: other], caller, banned) do
    prune(other, caller, banned)
  end

  def prune(other, caller, banned) when is_list(other) do
    lc x inlist other, do: prune(x, caller, banned)
  end

  def prune(other, _caller, _banned) do
    other
  end
end