# Routes

## get

### "/"

*Priority: 1*

Index page.  Show two columns: one for editing source code, the other for displaying results.

Alternatively, two rows: the larger one for editing source code, the other for displaying results.

A "run" button, obviously.

### "/tutorials"

*Priority: 2*

A set of Elixir tutorials that the readers can try out with online editor.

## post

### "/code"

*Priority: 1*

All source code should be "post" to this route.  The backend should take the code, run it, and return the result or failure messages.