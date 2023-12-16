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

export const enregistrerMenagere = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrerMenagere`), values);
};

// /myra-homeservice-api/admin/recherchermenageresparpage
// rechercherMenageresParPage

export const rechercherMenageresParPage = async (page, size, menagere) => {
  return await axios.post(
    BASE_URL(`admin/recherchermenageresparpage?page=${page}&size=${size}`),
    menagere
  );
};

export const supprimerMenagere = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimerMenagere/${id}`), {});
};

export const exportToutLesMenagere = async () => {
  return await axios.get(
    BASE_URL(`telechargerMenagere`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
