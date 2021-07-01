import { LOAD_PRODUCT_INFO } from "../actions/product/actions-type";

const initialState = {
  list: [],
  media_list: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_INFO:
      return {
        list: action.payload.list,
        media_list: action.payload.media_list,
      };

    default:
      break;
  }
  return state;
};

export default ProductReducer;
