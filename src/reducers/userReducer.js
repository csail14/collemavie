import { LOAD_USER_INFO, LOGOUT_USER_INFO } from "../actions/user/actions-type";

const initialState = {
  isLogged: false,
  infos: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_INFO:
      return { isLogged: true, infos: action.payload };
      break;
    case LOGOUT_USER_INFO:
      return initialState;
      break;
    default:
      break;
  }
  return state;
};

export default UserReducer;
