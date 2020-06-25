import { keepAlive } from "../services/auth.service";

const FETCH_ACTION = "FETCH_USER";
const REMOVE_USER_ACTION = "REMOVE_USER";

export const fetchUserProfile = () => {
  return (dispatch) => {
    return keepAlive().then((response) => {
      if (response.status === 200) {
        dispatch({
          type: FETCH_ACTION,
          item: {
            user: response.user,
          },
        });
      } else {
        // show error msg
        dispatch({
          type: FETCH_ACTION,
          item: {
            user: undefined,
          },
        });
      }
    });
  };
};

export const removeUserProfile = () => {
  return {
    type: REMOVE_USER_ACTION,
  };
};

// Selectors
export const getCurrentUser = (state) => {
  return state.userReducer.user;
};

const initializeState = {
  user: undefined,
};

// Reducer
const currentUserReducer = (state = initializeState, action) => {
  switch (action.type) {
    case FETCH_ACTION:
      return {
        user: action.item.user,
      };
    case REMOVE_USER_ACTION:
      return initializeState;
    default:
      return state;
  }
};

export default currentUserReducer;
