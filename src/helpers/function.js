import { getMediaByProduct } from "../api/mediaApi";

export const setAllProduct = (res) => {
  let newProduct = res.products;
  for (let i = 0; i < newProduct.length; i++) {
    getMediaByProduct(newProduct[i].id).then((response) => {
      let mediaArray = [];
      for (let j = 0; j < response.product.length; j++) {
        mediaArray.push(response.product[j].url);
      }
      newProduct[i].media = mediaArray;
    });
  }
  return newProduct;
};
