defmodule Safe do
  @allowed_modules ["String"]

  def eval(string) do
    { :ok, ast } = Code.string_to_ast(string)
    custom_modules = extract_custom_modules(ast)
    { res, _ }   = Code.eval_quoted prune(ast, __ENV__,
      List.concat(@allowed_modules, custom_modules))
    res
  end

  defp extract_custom_modules({:__block__, meta, args}) when is_list(args) do
    results = Enum.map args, fn(x) ->
      extract_custom_modules(x)
    end
    Enum.filter(List.concat(results), &1 != nil)
  end

  defp extract_custom_modules({:defmodule = dot, meta, args}) do
    {:__aliases__, _, [module_name]} = :lists.nth(1, args)
    [to_binary(module_name)]
  end

  defp extract_custom_modules(others) do
    [nil]
  end

  defp custom_module_to_binary(module) do
    prefix = "Elixir."
    name = to_binary(module)
    if String.starts_with? name, prefix do
      String.slice(name,
        String.length(prefix),
        String.length(name) - String.length(prefix))
    else
      name
    end
  end

  def prune({ { :., _, [module, _] } = dot, meta, args } = tree, caller, allowed) do
    module = Macro.expand(module, caller)
    if is_atom(module) do
      if custom_module_to_binary(module) in allowed do
        { dot, meta, prune(args, caller, allowed) }
      else
        raise "Calls to #{inspect module} are not allowed"
      end
    else
      raise "Invalid call expression #{inspect Macro.to_binary(tree)}"
    end
  end

  def prune({:import, _meta, _args}, _caller, _allowed) do
    raise "Imports are not allowed for security reasons :P"
  end

  def prune({:__block__ = dot, meta, args} = tree, caller, allowed) do
    { dot, meta, prune(args, caller, allowed) }
  end

  def prune(other, _caller, _allowed) when is_list(other) do
    Enum.map(other, fn(x) ->
      prune(x, _caller, _allowed)
    end)
  end

  def prune(other, _caller, _allowed) do
    other
  end
end