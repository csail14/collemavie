import { LOAD_CAT_INFO } from "./actions-type";

export const loadCatInfo = (cat) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_CAT_INFO,
      payload: cat,
    });
  };
};
