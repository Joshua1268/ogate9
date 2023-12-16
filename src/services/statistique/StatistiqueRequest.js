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
// GET
// /myra-homeservice-api/admin/rechercherstatistiques
// rechercherStatistiques

// POST / myra - homeservice - api / admin / recherchergraphe;
// rechercherGraphe;

export const rechercherStatistiques = async () => {
  return await axios.get(BASE_URL(`admin/rechercherstatistiques`), {});
};

export const rechercherGraphe = async (values) => {
  return await axios.post(BASE_URL("admin/recherchergraphe"), values);
};

export const getListeAnnee = async () => {
  return await axios.get(BASE_URL(`admin/annee`), {});
};

export const rechercheNombreClient = async (values) => {
  return await axios.post(
    BASE_URL(`admin/recherchernombresouscriptions`),
    values
  );
};

export const rechercheMontantTotal = async (values) => {
  return await axios.post(
    BASE_URL(`admin/recherchernombresouscriptions`),
    values
  );
};

export const rechercheGrapheMontantGenere = async (values) => {
  return await axios.post(
    BASE_URL(`admin/recherchergraphesouscriptions`),
    values
  );
};

export const rechercheGrapheCommandeValide = async (values) => {
  return await axios.post(
    BASE_URL(`admin/recherchergraphestentatives`),
    values
  );
};
