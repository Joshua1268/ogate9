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

// /myra-homeservice-api/admin/rechercherclients
// rechercherClients

// export const enregistrerPays = async (values) => {
//   return await axios.post(BASE_URL(`admin/enregistrerpays`), values);
// };

// rechercherclients?page=4&size=2

export const rechercherClients = async (page, size, param) => {
  return await axios.post(
    BASE_URL(`admin/rechercherclients?page=${page}&size=${size}`),
    param
  );
};

// superadmin/changeretatcomptecleint/2?page=4&size=2

export const changerEtatCompteClient = async (id, data) => {
  return await axios.post(
    BASE_URL(`superadmin/changeretatcompteclient/${id}`),
    { data }
  );
};

// export const modifPays = async (values) => {
//   return await axios.put(BASE_URL(`admin/modifierpays`), values);
// };

// export const deletepays = async (id) => {
//   return await axios.delete(BASE_URL(`superadmin/supprimerpays/${id}`), {});
// };

// export const rechercherPaysParParam = async (page, size, param) => {
//   return await axios.get(
//     BASE_URL(
//       `admin/rechercherpaysparparam?page=${page}&size=${size}&param=${param}`
//     ),
//     {}
//   );
// };

export const exportToutLesClients = async () => {
  return await axios.get(
    BASE_URL(`telechargerclients`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
