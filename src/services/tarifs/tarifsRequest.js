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

export const enregistrerTarif = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrertarif`), values);
};

export const supprimerTarif = async (tarifId) => {
  return await axios.delete(
    BASE_URL(`superadmin/supprimertarif/${tarifId}`),
    {}
  );
};

export const rechercherTarifsParPage = async (page, size, dataTarif) => {
  return await axios.post(
    BASE_URL(`admin/recherchertarifsparpage?page=${page}&size=${size}`),
    dataTarif
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
