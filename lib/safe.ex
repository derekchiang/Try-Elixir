defmodule Safe do
  # TODO: come up with a list of @banned_modules modules
  # TODO: Add documentation to this module
  @banned_modules [Code, System, IO, File,
    :os, :compiler, :mnesia, :odbc,
    :inets, :wx, :hipe, :stdlib]

  def eval(string) do
    { :ok, ast } = Code.string_to_ast(string)
    { res, _ }   = Code.eval_quoted prune(ast, __ENV__)
    res
  end

  def prune({ { :., _, [module, _] } = dot, meta, args } = tree, caller) do
    module = Macro.expand(module, caller)
    if is_atom(module) do
      if not (module in @banned_modules) do
        { dot, meta, prune(args, caller) }
      else
        raise "Calls to #{inspect module} are not allowed for security reasons :P"
      end
    else
      raise "Invalid call expression #{inspect Macro.to_binary(tree)}"
    end
  end

  def prune({ { :., meta, args} = dot, outer_meta, outer_args } = tree, caller) do
    {{:., meta, prune(args, caller)}, outer_meta, outer_args}
  end

  def prune({[], other}, caller) do
    {[], prune(other, caller)}
  end

  @banned_macros_and_functions [:import, :apply, :spawn, :receive]

  def prune({dot, _meta, _args}, _caller)
    when dot in @banned_macros_and_functions do
    raise "#{dot} is not allowed for security reasons :P"
  end

  @meta_atoms [:__block__, :=, :fn, :"->"]

  def prune({dot, meta, args} = tree, caller)
    when dot in @meta_atoms do
    { dot, meta, prune(args, caller) }
  end

  def prune([do: other], caller) do
    prune(other, caller)
  end

  def prune(other, caller) when is_list(other) do
    lc x inlist other, do: prune(x, caller)
  end

  def prune(other, _caller) do
    other
  end
end