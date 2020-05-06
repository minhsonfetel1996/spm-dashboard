import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import globalToastReducer from "./GlobalToastReducer";
import currentUserReducer from "./CurrentUserReducer";
import modalReducer from "./ModalReducer";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  toastReducer: globalToastReducer,
  userReducer: currentUserReducer,
  modal: modalReducer,
});

export default () => {
  return createStore(
    combinedReducers,
    {},
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f // for debugging
    )
  );
};
