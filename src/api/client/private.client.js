import axios from "axios";
import { AppConstants } from "const";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_API_SERVICE_URL;

const privateClient = axios.create({
  baseURL,
  paramsSerializers: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem(
        AppConstants.TOKEN_STORAGE
      )}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response?.data) return response.data;
    return response;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default privateClient;
