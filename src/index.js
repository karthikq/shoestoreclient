/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Reducers } from "./components/reducers";
import { Provider } from "react-redux";
import AuthContext from "./context/authContext";
import SelProductContext from "./context/selProductcontext";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AuthContext>
      <SelProductContext>
        <Router>
          <App />
        </Router>
      </SelProductContext>
    </AuthContext>
  </Provider>,
  document.getElementById("root")
);
