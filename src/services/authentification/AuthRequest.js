import { BASE_URL } from "../BaseUrl.js";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("myra_access_api");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = null;
  }

  return config;
});

export const loginAdmin = async (values) => {
  return await axios.post(BASE_URL("signin"), values);
};

export const changePasswordAdmin = async (values) => {
  return await axios.post(BASE_URL("changermotdepasse"), values);
};

export const resetPasswordAdmin = async (values) => {
  return await axios.post(BASE_URL("reinitialiserpassword"), values);
};
