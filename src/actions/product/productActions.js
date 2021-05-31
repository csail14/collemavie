import { LOAD_PRODUCT_INFO } from "./actions-type";

export const loadProductInfo = (products) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_PRODUCT_INFO,
      payload: products,
    });
  };
};
