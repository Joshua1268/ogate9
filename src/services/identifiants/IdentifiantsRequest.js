import { BASE_URL } from "../BaseUrl.js"; 
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token_moninternet")
  if (token) {
    config.headers.Authorization =  `Bearer ${token}`;
  } else {
    config.headers.Authorization =  null;
  }

  return config;
});

export const changeUserPassword = async (values) => {
  return await axios.post(
    BASE_URL("changermotdepasse"),
    values
  );
};