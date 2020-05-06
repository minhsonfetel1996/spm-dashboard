import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import getAppStore from "./reducers/AppContainer";
import { fetchUserProfile } from "./reducers/CurrentUserReducer";

const store = getAppStore();

const template = (
  <Provider store={store}>
    <App />
  </Provider>
);

store.dispatch(fetchUserProfile());
ReactDOM.render(template, document.getElementById("root"));
