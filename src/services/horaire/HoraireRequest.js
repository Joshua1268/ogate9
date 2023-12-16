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
// /myra-homeservice-api/admin/enregistrerhoraire
// enregistrerHoraire
// POST
// /myra-homeservice-api/admin/rechercherHoraireParPage
// rechercherHorairesParPage

export const enregistrerHoraire = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrerhoraire`), values);
};

export const rechercherListeHorairesParPage = async (
  page,
  size,
  paramHoraire
) => {
  return await axios.post(
    BASE_URL(`admin/rechercherHoraireParPage?page=${page}&size=${size}`),
    paramHoraire
  );
};

export const supprimerHoraire = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimerHoraire/${id}`), {});
};

export const exportToutLesHoraire = async () => {
  return await axios.get(
    BASE_URL(`telechargerHoraire`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
