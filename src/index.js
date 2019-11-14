import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import axios from "axios";
import App from "./App";
var ReduxThunk = require("redux-thunk").default;

const logger = createLogger();
const initialState = {
  loading: false,
  data: [],
  error: ""
};

const actionList = {
  request_success: "REQUEST_SUCCESS",
  request_loading: "REQUEST_LOADING",
  request_fail: "REQUEST_FAIL"
};

//CREAT ACTIONS
function action_loading() {
  return {
    type: actionList.request_loading
  };
}

function action_success(users) {
  return {
    type: actionList.request_success,
    payload: users
  };
}

function action_fail(error) {
  return {
    type: actionList.request_fail,
    payload: error
  };
}

//CREATE REDUCER
function reducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_LOADING":
      return (state = { loading: true });
    case "REQUEST_SUCCESS":
      return (state = { loading: false, data: [...action.payload] });
    case "REQUEST_FAIL":
      return (state = { loading: false, error: action.payload });
    default:
      return state;
  }
}

//CREATE FETCHUSER ASYNC FUNCTION
const getUsers = () => {
  return dispatch => {
    //dispatch loading action
    dispatch(action_loading());
    axios
      .get("https://randomuser.me/api/?results=5")
      .then(response => {
        //dispatch success action with data
        dispatch(action_success(response.data.results));
      })
      .catch(error => {
        // dispatch error action with error message
        dispatch(action_fail(error.message));
      });
  };
};

//CREATE STORE
const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));
store.dispatch(getUsers());
const rootElem = document.getElementById("root");
const render = () => {
  ReactDOM.render(<App state={store.getState()} />, rootElem);
};

store.subscribe(render);
