import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";
import "./index.css";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const store = configureStore(
  { reducer: reducers },
  {},
  compose(applyMiddleware(thunk))
);
//configureStore is called as soon as the page in rendered.

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
