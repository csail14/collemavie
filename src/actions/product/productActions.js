import { LOAD_PRODUCT_INFO } from "./actions-type";

export const loadProductInfo = (products, media) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_PRODUCT_INFO,
      payload: { list: products, media_list: media },
    });
  };
};
