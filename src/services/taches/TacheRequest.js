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

export const enregistrerTache = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrertache`), values);
};

export const rechercherListeTachesParPage = async (page, size, tache) => {
  return await axios.post(
    BASE_URL(`admin/rechercherlistechagesparpage?page=${page}&size=${size}`),
    tache
  );
};

export const rechercherlistevillesparpays = async (paysId) => {
  return await axios.get(
    BASE_URL(`admin/rechercherlistevillesparpays/${paysId}`),
    {}
  );
};

export const supprimerTache = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimertache/${id}`), {});
};

export const exportToutLesTache = async () => {
  return await axios.get(
    BASE_URL(`telechargerTache`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
