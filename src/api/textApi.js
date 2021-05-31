import axios from "axios";
import { config } from "../config";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Access-Control-Allow-Origin",
};

export const getTextById = async (id) => {
  return axios
    .get(config.api_url + "/api/v1/get/text/" + id, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const setTextById = async (id, data) => {
  let body = {
    id: id,
    text: data,
  };
  return axios
    .put(config.api_url + "/api/v1/edit/text/" + id, {
      headers: headers,
      body: body,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
