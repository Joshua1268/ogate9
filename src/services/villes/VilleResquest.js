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

export const enregistrerville = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrerville`), values);
};

export const rechercherListeville = async () => {
  return await axios.get(BASE_URL(`admin/rechercherlisteville`), {});
};

export const rechercherListevilleparpage = async (page, size, ville) => {
  return await axios.post(
    BASE_URL(`admin/rechercherlistevillesparpage?page=${page}&size=${size}`),
    ville
  );
};

export const rechercherlistevillesparpays = async (paysId) => {
  return await axios.get(
    BASE_URL(`admin/rechercherlistevillesparpays/${paysId}`),
    {}
  );
};

export const deleteville = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimerVille/${id}`), {});
};

export const exportToutLesville = async () => {
  return await axios.get(
    BASE_URL(`telechargerville`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
