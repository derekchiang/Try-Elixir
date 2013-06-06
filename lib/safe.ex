defmodule Safe do
  # TODO: come up with a list of banned modules
  # TODO: Add documentation to this module
  @banned_modules [Code, System, IO, :compiler, :mnesia, :odbc, :inets, :wx, :hipe, :stdlib]

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

  def prune({:import, _meta, _args}, _caller, _banned) do
    raise "Imports are not allowed for security reasons :P"
  end

  def prune({:__block__ = dot, meta, args} = tree, caller, banned) do
    { dot, meta, prune(args, caller, banned) }
  end

  def prune(other, _caller, _banned) when is_list(other) do
    Enum.map(other, fn(x) ->
      prune(x, _caller, _banned)
    end)
  end

  def prune(other, _caller, _banned) do
    other
  end
end