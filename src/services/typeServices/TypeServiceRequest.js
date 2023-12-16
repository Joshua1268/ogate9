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

export const enregistrerTypeService = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrertypeservice`), values);
};

export const rechercherListeTypeServiceparparam = async (page, size, param) => {
  return await axios.get(
    BASE_URL(
      `admin/rechercherlistetypeserviceparpage?page=${page}&size=${size}&param=${param}`
    ),
    {}
  );
};

export const supprimerTypeService = async (id) => {
  return await axios.delete(
    BASE_URL(`superadmin/supprimertypeservice/${id}`),
    {}
  );
};

export const exportToutLesTypesService = async () => {
  return await axios.get(
    BASE_URL(`telechargerTypeServices`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
