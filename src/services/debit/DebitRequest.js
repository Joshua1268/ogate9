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

export const rechercherDebits = async (page, size) => {
  return await axios.get(
    BASE_URL(`admin/rechercherdebits?page=${page}&size=${size}`),
    {}
  );
};

// export const exportToutLesClients = async () => {
//   return await axios.get(
//     BASE_URL(`telechargerclients`),
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
//       },
//       responseType: "blob",
//     }
//   );
// };
