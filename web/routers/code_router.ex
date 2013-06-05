defmodule CodeRouter do
  use Dynamo.Router

  prepare do
    # Pick which parts of the request you want to fetch
    # You can comment the line below if you don't need
    # any of them or move them to a forwarded router
    conn.fetch([:params])
  end

  # /code
  post "/" do
    code = conn.params[:code]
    try do
      {result, _} = Code.eval_string(code)
      if is_tuple(result) do
        cond do
          :erlang.element(1, result) == :module ->
            conn.resp 200, "Successfully compiled."
          true ->
            conn.resp 200, "Something went wrong!"
        end
      else
        conn.resp 200, to_binary(result)
      end
    rescue
      error ->
        # Is this the most elegant way to get an error message
        # as a string?
        conn.resp 200, to_binary(:io_lib.format("~p", [error]))
    end
  end
end
