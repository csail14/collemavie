import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("collemavie");

const headers = {
  "Content-Type": "application/json",
  Authorization: "Access-Control-Allow-Origin",
  "x-access-token": token,
};

export const addCat = async (data) => {
  return axios
    .post(config.api_url + "/api/v1/add/cat", data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCatAll = async () => {
  return axios
    .get(config.api_url + "/api/v1/all/cat", {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getCatById = async (id) => {
  return axios
    .get(config.api_url + "/api/v1/get/cat/" + id, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
export const deleteCatById = async (id) => {
  return axios
    .delete(config.api_url + "/api/v1/delete/cat/" + id, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
