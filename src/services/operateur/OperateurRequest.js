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

export const enregistrerOperateur = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistreroperateur`), values);
};

export const rechercherListeOperateursParPage = async (
  page,
  size,
  operateur
) => {
  return await axios.post(
    BASE_URL(`admin/rechercheroperateursparpage?page=${page}&size=${size}`),
    operateur
  );
};

// export const rechercherlisteoperateursparpays = async (paysId) => {
//   return await axios.get(
//     BASE_URL(`admin/rechercherlisteoperateursparpays/${paysId}`),
//     {}
//   );
// };

export const supprimerOperateur = async (id) => {
  return await axios.delete(
    BASE_URL(`superadmin/supprimerOperateur/${id}`),
    {}
  );
};

export const exportToutLesOperateur = async () => {
  return await axios.get(
    BASE_URL(`telechargeroperateur`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
