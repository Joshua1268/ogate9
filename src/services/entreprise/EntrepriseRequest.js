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

export const enregistrerEntreprise = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrerEntreprise`), values);
};

// /myra-homeservice-api/admin/rechercherEntreprisesparpage
// rechercherEntreprisesParPage

// {
//     "adresse": "string",
//     "codePostal": "string",
//     "emailResponsable": "string",
//     "nomResponsable": "string",
//     "numeroAppartement": "string",
//     "numeroEntreprise": "string",
//     "numeroResponsable": "string",
//     "password": "string",
//     "paysId": 0,
//     "prenomsResponsable": "string",
//     "raisonSocial": "string",
//     "registreCommerceId": 0,
//     "villeId": 0
//   }

export const rechercherEntreprisesParPage = async (page, size, Entreprise) => {
  return await axios.post(
    BASE_URL(`admin/rechercherentreprisesparpage?page=${page}&size=${size}`),
    Entreprise
  );
};

export const supprimerEntreprise = async (id) => {
  return await axios.delete(
    BASE_URL(`superadmin/supprimerEntreprise/${id}`),
    {}
  );
};

export const exportToutLesEntreprise = async () => {
  return await axios.get(
    BASE_URL(`telechargerEntreprise`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
