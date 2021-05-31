import { LOAD_PRODUCT_INFO } from "../actions/product/actions-type";

const initialState = {
  list: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_INFO:
      return { list: action.payload };

    default:
      break;
  }
  return state;
};

export default UserReducer;
