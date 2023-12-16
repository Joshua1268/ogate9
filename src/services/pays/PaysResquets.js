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

// POST
// /myra-homeservice-api/admin/enregistrerpays
// enregistrerPays
// GET
// /myra-homeservice-api/admin/rechercherlistepays
// rechercherListePays
// GET
// /myra-homeservice-api/mobile/rechercherlistepays
// rechercherListePaysAppMobile
// DELETE
// /myra-homeservice-api/superadmin/supprimerpays/{id}
// supprimerPays

export const enregistrerPays = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrerpays`), values);
};

export const rechercherListePays = async () => {
  return await axios.get(BASE_URL(`admin/rechercherlistepays`), {});
};

export const modifPays = async (values) => {
  return await axios.put(BASE_URL(`admin/modifierpays`), values);
};

export const deletepays = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimerpays/${id}`), {});
};

export const rechercherPaysParParam = async (page, size, param) => {
  return await axios.get(
    BASE_URL(
      `admin/rechercherpaysparparam?page=${page}&size=${size}&param=${param}`
    ),
    {}
  );
};

export const exportToutLesPays = async () => {
  return await axios.get(
    BASE_URL(`telechargerpays`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
