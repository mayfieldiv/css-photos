import React from "react"
import { render } from "react-dom"

import App from "./app/app"

render(
  <React.StrictMode>
    {/* <h1>Hello World</h1> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
