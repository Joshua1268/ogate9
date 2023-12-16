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

export const enregistrerTypePiece = async (values) => {
  return await axios.post(BASE_URL(`admin/enregistrertypepiece`), values);
};

export const rechercherListeTypePieceparparam = async (page, size, param) => {
  return await axios.get(
    BASE_URL(
      `admin/rechercherlistetypepiecesparpage?page=${page}&size=${size}&param=${param}`
    ),
    {}
  );
};

export const supprimerTypePiece = async (id) => {
  return await axios.delete(
    BASE_URL(`superadmin/supprimertypepieces/${id}`),
    {}
  );
};

export const exportToutLesTypesPiece = async () => {
  return await axios.get(
    BASE_URL(`telechargerTypePieces`),
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myra_access_api")}`,
      },
      responseType: "blob",
    }
  );
};
