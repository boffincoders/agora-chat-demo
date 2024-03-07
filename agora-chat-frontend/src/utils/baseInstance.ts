import axios from "axios";
import { EnvConfig } from "../config/env.config";
let loggedInUser: any = localStorage.getItem("loggedInUser");
const getLoggedInUser = () => {
  const userString = localStorage.getItem("loggedInUser");
  return userString ? JSON.parse(userString) : null;
};

const baseInstance = () => {
  if (loggedInUser) loggedInUser = JSON.parse(loggedInUser);
  let axiosInstance = axios.create({
    baseURL: EnvConfig.baseUrl,
  });
  axiosInstance.interceptors.request.use(
    function (config: any) {
      const loggedInUser = getLoggedInUser();

      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: loggedInUser
            ? "bearer" + " " + loggedInUser.token
            : "",
        },
      };
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default baseInstance();
