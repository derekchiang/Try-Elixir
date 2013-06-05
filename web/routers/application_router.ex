defmodule ApplicationRouter do
  use Dynamo.Router

  forward "/code", to: CodeRouter

  get "/" do
    conn = conn.assign(:title, "Welcome to Dynamo!")
    render conn, "index.html"
  end
end
