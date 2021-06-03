import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("collemavie");

const headers = {
  "Content-Type": "application/json",
  Authorization: "Access-Control-Allow-Origin",
  "x-access-token": token,
};

export const addMedia = async (data) => {
  return axios
    .post(config.api_url + "/api/v1/add/media", data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getMediaByProduct = async (id) => {
  return axios
    .get(config.api_url + "/api/v1/get/media/" + id, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
