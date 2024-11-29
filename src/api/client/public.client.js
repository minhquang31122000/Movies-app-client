import axios from "axios";
import queryString from "query-string";

const baseURL = "http://ubuntu@ec2-18-179-5-154.ap-northeast-1.compute.amazonaws.com:5000/api/v1";

console.log({ baseURL });


const publicClient = axios.create({
  baseURL,
  paramsSerializers: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response;
  },
  (error) => {
    // if (error.response.status === 500) window.location.replace("/");

    throw error.response.data;
  }
);

export default publicClient;
