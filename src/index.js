import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
