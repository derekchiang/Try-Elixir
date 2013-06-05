defmodule ApplicationRouter do
  use Dynamo.Router

  forward "/code", to: CodeRouter

  get "/" do
    render conn, "index.html"
  end

  get "/*" do
    redirect conn, to: "/"
  end
end
