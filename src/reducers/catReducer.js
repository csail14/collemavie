import { LOAD_CAT_INFO } from "../actions/category/actions-type";

const initialState = {
  list: [],
};

const CatReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CAT_INFO:
      return { list: action.payload };

    default:
      break;
  }
  return state;
};

export default CatReducer;
