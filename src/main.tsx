import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/bigPie.ts";
import { getToken } from "./service/storageService.ts";
axios.defaults.baseURL =
  "https://sunday-nodejs-ae45497a96e2.herokuapp.com/api/v1";
axios.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    /*
      if token exists we edit the request
      adding headers
      and sending the request to the server
    */
    config.headers["Authorization"] = "bearer " + token;
  }
  return config;
});
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found");
}
