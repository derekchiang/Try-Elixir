Dynamo.under_test(TryElixir.Dynamo)
Dynamo.Loader.enable
ExUnit.start

defmodule TryElixir.TestCase do
  use ExUnit.CaseTemplate

  # Enable code reloading on test cases
  setup do
    Dynamo.Loader.enable
    :ok
  end
end
