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
// {
//     "dateDebut": "string",
//     "dateFin": "string",
//     "paysId": 0,
//     "typeServiceId": 0
//   }

export const rechercherCommandes = async (page, size, data) => {
  return await axios.post(
    BASE_URL(`admin/recherchercommandes?page=${page}&size=${size}`),
    data
  );
};

// export const changerEtatCompteClient = async (id, data) => {
//   return await axios.post(
//     BASE_URL(`superadmin/changeretatcompteclient/${id}`),
//     { data }
//   );
// };

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
