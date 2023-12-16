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
// /myra-homeservice-api/admin/enregistrercommune
// enregistrerCommune
// POST
// /myra-homeservice-api/admin/rechercherlistecommunesparpage
// rechercherListeCommunesParPage
// POST
// /myra-homeservice-api/admin/rechercherlistecommunesparville
// rechercherListeCommunesParPays
// GET

// DELETE
// /myra-homeservice-api/superadmin/supprimerCommune/{id}
// supprimerCommune

export const enregistrercommune = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrercommune`), values);
};

export const rechercherListecommune = async () => {
  return await axios.get(BASE_URL(`admin/rechercherlistecommune`), {});
};

export const rechercherListecommuneparpage = async (page, size, commune) => {
  return await axios.post(
    BASE_URL(`admin/rechercherlistecommunesparpage?page=${page}&size=${size}`),
    commune
  );
};

export const rechercherlistecommunesparville = async (villeId) => {
  return await axios.get(
    BASE_URL(`admin/rechercherlistecommunesparville/${villeId}`),
    {}
  );
};

export const deletecommune = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimerCommune/${id}`), {});
};

export const exportToutLescommune = async () => {
  return await axios.get(
    BASE_URL(`telechargercommune`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
