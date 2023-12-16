import { BASE_URL } from "../BaseUrl.js";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token_moninternet");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = null;
  }

  return config;
});

export const getListeUtilisateur = async (page, size) => {
  return await axios.get(
    BASE_URL(`admin/rechercherutilisateurs?page=${page}&size=${size}`),
    {}
  );
};

export const ajoutUtilisateur = async (values) => {
  return await axios.post(BASE_URL("admin/enregistrerUtilisateur"), values);
};

export const modificationUtilisateur = async (values) => {
  return await axios.post(BASE_URL(""), values);
};

export const rechercherUtilisateurParParam = async (page, size, param) => {
  return await axios.get(
    BASE_URL(
      `superadmin/rechercherutilisateurs?page=${page}&size=${size}&param=${param}`
    ),
    {}
  );
};

export const changerMotDePasse = async (values) => {
  return await axios.post(BASE_URL(`admin/changermotdepasse`), values);
};

export const supprimerUtilisateurParId = async (userId) => {
  return await axios.post(
    BASE_URL(`superadmin/supprimerUtilisateur/${userId}`),
    {}
  );
};

export const changerEtatCompteUtilisateur = async (id) => {
  return await axios.post(BASE_URL(`superadmin/changeretatcompte/${id}`), {});
};

export const enregistrerUtilisateur = async (values) => {
  return await axios.post(
    BASE_URL(`superadmin/creercompteutilisateur`),
    values
  );
};

export const modifierUtilisateur = async (valuesModifs) => {
  return await axios.post(
    BASE_URL(`superadmin/modifiercompteutilisateur/`),
    valuesModifs
  );
};
