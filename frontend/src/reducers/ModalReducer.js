// actions
const SHOW_MODAL_ACTION = "SHOW_MODAL";
const HIDE_MODAL_ACTION = "HIDE_MODAL";

// action creators

export const showModal = (contentType, data) => {
  return {
    type: SHOW_MODAL_ACTION,
    item: {
      contentType,
      data,
    },
  };
};

export const hideModal = () => {
  return { type: HIDE_MODAL_ACTION };
};

// selectors
export const isShowModal = (state) => {
  return state.modal.isShow;
};

export const getModalData = (state) => {
  return state.modal.data;
};

export const getContentType = (state) => {
  return state.modal.contentType;
};

// Handler
const showModalHandler = (action) => {
  return {
    isShow: true,
    contentType: action.item.contentType,
    data: action.item.data,
  };
};

const hideModalHandler = () => {
  return {
    isShow: false,
  };
};

const initializeState = {
  isShow: false,
};

const modalReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SHOW_MODAL_ACTION:
      return showModalHandler(action);
    case HIDE_MODAL_ACTION:
      return hideModalHandler();
    default:
      return state;
  }
};

export default modalReducer;