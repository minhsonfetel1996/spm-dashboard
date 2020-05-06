import STATUS from "./constants/ToastStatus";

// action type
const SHOW_TOAST_SUCCESS_ACTION = "SHOW_TOAST_SUCCESS";
const SHOW_TOAST_INFORMATION_ACTION = "SHOW_TOAST_INFORMATION";
const SHOW_TOAST_ERROR_ACTION = "SHOW_TOAST_ERROR";
const HIDE_ACTION = "HIDE";

// Action creators
export const showToastSuccess = (title, message) => {
  return {
    type: SHOW_TOAST_SUCCESS_ACTION,
    item: {
      title,
      message,
    },
  };
};

export const showToastInformation = (message) => {
  return {
    type: SHOW_TOAST_INFORMATION_ACTION,
    item: {
      title: "INFORMATION",
      message,
    },
  };
};

export const showToastError = (message) => {
  return {
    type: SHOW_TOAST_ERROR_ACTION,
    item: {
      title: "ERROR",
      message,
    },
  };
};

export const hideToast = () => {
  return {
    type: HIDE_ACTION,
  };
};

// Selectors
export const isShow = (state) => {
  return state.toastReducer.isShow;
};

export const getToastMessage = (state) => {
  return state.toastReducer.message;
};

export const getToastTitle = (state) => {
  return state.toastReducer.title;
};

export const getToastContentType = (state) => {
  return state.toastReducer.contentType;
};

const showToastHandler = (action, contentType) => {
  return {
    isShow: true,
    ...action.item,
    contentType,
  };
};

const hideToastHandler = () => {
  return {
    isShow: false,
  };
};

// Reducer
const globalToastReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_TOAST_SUCCESS_ACTION:
      return showToastHandler(action, STATUS.SUCCESS);
    case SHOW_TOAST_INFORMATION_ACTION:
      return showToastHandler(action, STATUS.INFORMATION);
    case SHOW_TOAST_ERROR_ACTION:
      return showToastHandler(action, STATUS.ERROR);
    case HIDE_ACTION:
      return hideToastHandler();
    default:
      return state;
  }
};

export default globalToastReducer;
