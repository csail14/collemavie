import axios from "axios";
import { config } from "../config";

export const loginUser = (data) => {
  return axios
    .post(config.api_url + "/api/v1/user/login", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("erreur");
      return err;
    });
};

export const sendContactMessage = (data) => {
  return axios
    .post(config.api_url + "/api/v1/user/contact", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const validateUser = (key) => {
  return axios
    .get(config.api_url + "/api/v1/user/validate/" + key)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
