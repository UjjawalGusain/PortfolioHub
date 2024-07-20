// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import UsernameLoader from "./components/Home/UsernameLoader.jsx"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UsernameLoader />
  </Provider>
);
