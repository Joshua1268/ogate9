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

export const enregistrerFaq = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrerfaq`), values);
};

export const rechercherListeFaqsParPage = async (page, size, Faq) => {
  return await axios.post(
    BASE_URL(`admin/rechercherlistefaq?page=${page}&size=${size}`),
    Faq
  );
};

// export const rechercherlisteFaqsparpays = async (paysId) => {
//   return await axios.get(
//     BASE_URL(`admin/rechercherlisteFaqsparpays/${paysId}`),
//     {}
//   );
// };

export const supprimerFaq = async (id) => {
  return await axios.delete(BASE_URL(`superadmin/supprimerfaq/${id}`), {});
};

export const exportToutLesFaq = async () => {
  return await axios.get(
    BASE_URL(`telechargerFaq`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
