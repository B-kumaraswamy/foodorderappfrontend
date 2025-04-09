import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import FoodOrderApp from "./App";
import Clarity from "@microsoft/clarity";
const projectId = "ppxz7ixe0n";

Clarity.init(projectId);
let userName = "kumar";
Clarity.identify(userName);
console.log("kumar-12345", null, null, userName);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FoodOrderApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
ReactDOM.render(
  <React.StrictMode>
    <FoodOrderApp />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
