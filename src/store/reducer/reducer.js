import ActionTypes from "../constant";

const INITIAL_STATE = {
  trackerArr: [],
  currentUser: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TRACKER_LOGS:
      return { ...state, trackerArr: action.payload };
    case ActionTypes.SIGNUP_SUCCED:
      return { ...state, currentUser: action.payload };
    case ActionTypes.SIGNIN_SUCCED:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
