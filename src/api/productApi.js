import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("collemavie");

const headers = {
  "Content-Type": "application/json",
  Authorization: "Access-Control-Allow-Origin",
  "x-access-token": token,
};

export const addProduct = async (data) => {
  return axios
    .post(config.api_url + "/api/v1/add/product", data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getProductAll = async () => {
  return axios
    .get(config.api_url + "/api/v1/all/products", {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getProductById = async (id) => {
  return axios
    .get(config.api_url + "/api/v1/get/product/" + id, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
export const deleteProductById = async (id) => {
  return axios
    .delete(config.api_url + "/api/v1/delete/product/" + id, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
