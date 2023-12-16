import React, { useEffect, useState } from "react";
import { Drawer, Pagination, Snackbar } from "@mui/material";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AlertCircle, Eye, Pencil, Trash } from "lucide-react";
import { rechercherMenageresParPage } from "../../services/menagere/MenagereRequest";
import { rechercherEntreprisesParPage } from "../../services/entreprise/EntrepriseRequest";

const MenagereIndependante = () => {
  const [pageQuery, setPageQuery] = useState({
    page: 0,
    size: 6,
    nombrePage: 1,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [desactiveLoading, setDesactiveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [snackbarSuccessOpen, setSnackbarOpenSuccess] = useState(false);
  const [snackbarErrorOpen, setSnackbarOpenError] = useState(false);
  const [snackbarPosition, setSnackbarPosition] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const [menagereInfo, setMenagereInfo] = useState(null);
  // const [menagereListe, setMenagereListe] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paysId, setPaysId] = useState("");
  const [menageresListe, setMenageresListe] = useState([]);
  const [searchEntrepriseId, setSearchEntrepriseId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [entrepriseId, setEntrepriseId] = useState("");
  const [entrepriseListe, setEntrepriseListe] = useState([]);

  const { vertical, horizontal } = snackbarPosition;

  const rechercheEntreprise = () => {
    setLoadingData(true);
    rechercherEntreprisesParPage(pageQuery.page, pageQuery.size, {})
      .then((res) => {
        setLoadingData(false);
        setEntrepriseListe(res.data.donnee.entreprises);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
  };

  const returnStatut = (statut) => {
    return statut === "ATTENTE" ? (
      <span className="w-fit px-3 py-px flex items-center justify-center gap-x-2 rounded-md text-sm">
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        En attente
      </span>
    ) : statut === "VALIDE" ? (
      <span className="w-fit px-3 py-px flex items-center justify-center gap-x-2 rounded-md text-sm">
        <div className="w-2 h-2 rounded-full bg-green-600"></div>
        Validé
      </span>
    ) : statut === "REJETE" ? (
      <span className="w-fit px-3 py-px flex items-center justify-center gap-x-2 rounded-md text-sm">
        <div className="w-2 h-2 rounded-full bg-red-600"></div>
        Rejeté
      </span>
    ) : statut === "COURS" ? (
      <span className="w-fit px-3 py-px flex items-center justify-center gap-x-2 rounded-md text-sm">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        En cours
      </span>
    ) : null;
  };

  const TableElement = ({ user }) => {
    return (
      <tr>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.nom ? user.nom : "-"} {user.prenoms ? user.prenoms : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.adresse ? user.adresse : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.email ? user.email : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.numero ? user.numero : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.entreprise ? user.entreprise : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.statut ? returnStatut(user.statut) : "-"}
        </td>
        <td className="w-40 px-4 border-b border-r">
          <div className="flex items-center gap-x-3">
            {/* <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <Eye size={16} />
            </button>
            <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => {
                window.add_menagere.showModal();
                setMenagereInfo(user);
              }}
            >
              <Pencil size={16} />
            </button> */}
            <button
              className={
                user.enabled
                  ? "bg-gray-200 p-1.5 rounded-md font-medium text-gray-500 text-xs cursor-pointer"
                  : "bg-green-100 p-1.5 rounded-md font-medium text-green-500 text-xs cursor-pointer"
              }
              onClick={() => {
                window.lock_menagere.showModal();
                setMenagereInfo(user);
              }}
            >
              {user.enabled ? "Désactiver" : "Activer"}
            </button>

            <button
              className="bg-gray-100 p-1.5 rounded-md bg-red-200 text-red-600 cursor-pointer"
              onClick={() => {
                window.delete_menagere.showModal();
                setMenagereInfo(user);
              }}
            >
              <Trash size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const handleCloseSnackbarSuccess = () => {
    setSnackbarOpenSuccess(false);
  };

  const handleCloseSnackbarError = () => {
    setSnackbarOpenError(false);
  };

  const searchMenageres = () => {
    setSearchLoading(true);

    if (searchTerm === "" && paysId !== "") {
      const dataSearch = {
        entrepriseId: searchEntrepriseId,
        param: searchTerm,
      };
      rechercherMenageresParPage(pageQuery.page, pageQuery.size, dataSearch)
        .then((res) => {
          setSearchLoading(false);
          setMenageresListe(res.data.donnee.menageres);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
        })
        .catch((err) => {
          console.log("api error", err);
        });
    } else {
      const dataSearch = {
        entrepriseId: searchEntrepriseId,
        param: searchTerm,
      };
      rechercherMenageresParPage(pageQuery.page, pageQuery.size, dataSearch)
        .then((res) => {
          setSearchLoading(false);
          setMenageresListe(res.data.donnee.menageres);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
        })
        .catch((err) => {
          console.log("api error", err);
        });
    }
  };

  const handlePaginationChange = (event, value) => {
    setLoadingData(true);
    setPageQuery((prev) => ({
      ...prev,
      page: value,
      pagePagination: value,
    }));
    const Menageres = {
      entrepriseId: " ",
      param: "",
    };
    if (searchTerm.length === 0) {
      rechercherMenageresParPage(value - 1, pageQuery.size, Menageres)
        .then((res) => {
          setMenageresListe(res.data.donnee.menageres);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
          setLoadingData(false);
        })
        .catch((err) => {
          setLoadingData(false);
          console.log("api error", err);
        });
    } else {
      const Menageres = {
        entrepriseId: entrepriseId,
        param: searchTerm,
      };
      rechercherMenageresParPage(value - 1, pageQuery.size, Menageres)
        .then((res) => {
          setMenageresListe(res.data.donnee.menageres);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
          setLoadingData(false);
        })
        .catch((err) => {
          setLoadingData(false);
          console.log("api error", err);
        });
    }
  };

  useEffect(() => {
    rechercheEntreprise();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    const Menageres = {
      entrepriseId: " ",
      param: " ",
    };
    rechercherMenageresParPage(pageQuery.page, pageQuery.size, Menageres)
      .then((res) => {
        setLoadingData(false);
        setMenageresListe(res.data.donnee.menageres);
        setPageQuery((prev) => ({
          ...prev,
          nombrePage: res.data.donnee.totalPages,
        }));
      })
      .catch((err) => {
        setLoadingData(false);
        console.log("api error", err);
      });
  }, []);

  return (
    <div>
      <div className="w-full mt-7">
        <div className="flex md:flew-row lg:flex-row flex-col gap-4 items-center justify-between">
          <div className="flex md:flex-row lg:flex-row flex-col w-full items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un élément"
              className="input input-bordered font-medium md:w-48 lg:w-48 w-full h-10"
            />
            <select
              value={searchEntrepriseId}
              onChange={(e) => setSearchEntrepriseId(e.target.value)}
              className="select select-bordered select-sm font-medium md:w-36 lg:w-36 w-full h-10"
            >
              <option selected value=" ">
                Sélectionner une entreprise
              </option>
              {entrepriseListe.length > 0 &&
                entrepriseListe.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.raisonSocial}
                  </option>
                ))}
            </select>
            <button
              onClick={searchMenageres}
              className="md:w-24 lg:w-24 w-full  h-10 rounded-lg bg-black text-white text-sm font-medium"
            >
              {searchLoading ? (
                <div className="w-full rounded-lg bg-black text-white text-sm font-medium   flex gap-x-2  items-center justify-center">
                  <TailSpin
                    height="30"
                    width="30"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={searchLoading}
                  />
                </div>
              ) : (
                <span>Rechercher</span>
              )}
            </button>
          </div>
          <div className="flex md:flex-row lg:flex-row flex-col w-full justify-end items-center gap-3">
            <button className="md:w-24 lg:w-24 w-full h-10 rounded-lg bg-gray-600 text-white text-sm font-medium">
              Exporter
            </button>
            <button
              className="md:w-24 lg:w-24 w-full h-10 rounded-lg bg-primary text-white text-sm font-medium"
              onClick={() => {
                window.add_menagere.showModal();
                setMenagereInfo(null);
              }}
            >
              Ajouter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white w-full mt-2">
          <table className="custom-table table table-sm w-full">
            <thead>
              <tr className="bg-primary/10 h-12">
                <th className="text-sm text-black">Nom & Prénoms</th>
                <th className="text-sm text-black">Adresse</th>
                <th className="text-sm text-black">Email</th>
                <th className="text-sm text-black">Téléphone</th>
                <th className="text-sm text-black">Entreprise</th>
                <th className="text-sm text-black">Statut</th>
                <th className="text-sm text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loadingData && menageresListe.length > 0 ? (
                menageresListe.map((item) => (
                  <TableElement key={item.id} user={item} />
                ))
              ) : !loadingData && menageresListe.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="w-full h-32 bg-white flex gap-x-2 text-red-500 items-center justify-center">
                      <AlertCircle size={18} />
                      <p className="font-medium text-red-500">
                        Aucun élément trouvé
                      </p>
                    </div>
                  </td>
                </tr>
              ) : loadingData && menageresListe.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="w-full h-32 bg-white rounded-br-lg rounded-bl-lg flex gap-x-2 text-red-500 items-center justify-center">
                      <TailSpin
                        height="30"
                        width="30"
                        color="#000"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loadingData}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="w-full h-32 bg-white rounded-br-lg rounded-bl-lg flex gap-x-2 text-red-500 items-center justify-center">
                      <TailSpin
                        height="30"
                        width="30"
                        color="#000"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loadingData}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <Pagination
            count={pageQuery.nombrePage}
            // page={pageQuery.pagePagination}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </div>
      </div>

      {/* SIDEBAR DETAIL ENTREPRISE */}
      <Drawer
        anchor={"right"}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="w-[550px] px-4 pt-4">
          <h3 className="text-2xl font-semibold">Détail de la ménagère</h3>
        </div>
      </Drawer>

      {/* MODAL AJOUT ENTREPRISE */}
      <dialog id="add_menagere" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-black">
            {menagereInfo === null
              ? "Nouvelle ménagère"
              : "Modifier cette ménagère"}
          </h3>
          <div className="py-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Entreprise</span>
              </label>
              <select className="select select-bordered">
                <option disabled selected>
                  Sélectionner une entreprise
                </option>
                <option>Entreprise 1</option>
                <option>Entreprise 2</option>
                <option>Entreprise 3</option>
                <option>Entreprise 4</option>
                <option>Entreprise 5</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nom & Prénoms</span>
              </label>
              <input
                type="text"
                placeholder="Sam Sam"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center gap-x-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="exemple@gmail.com"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Téléphone</span>
                </label>
                <input
                  type="text"
                  placeholder="0708000000"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Adresse</span>
              </label>
              <input
                type="text"
                placeholder="Sam Sam"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-x-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-32 h-10 bg-gray-300 font-medium text-gray-700 rounded-lg">
                Annuler
              </button>
              <div className="w-32 h-10 bg-primary font-medium text-white rounded-lg flex items-center justify-center cursor-pointer">
                {menagereInfo === null ? "Enregistrer" : "Modifier"}
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* MODAL DELETE ENTREPRISE */}
      <dialog id="delete_menagere" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-center text-red-600">
            Supprimer cette ménagère
          </h3>
          <div className="py-4">
            <p className="text-center text-lg text-black">
              Attention action est irrversible et entrainera la suppression de
              l'menagere
            </p>
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="flex gap-x-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-32 h-10 bg-gray-300 text-gray-700 rounded-lg">
                Annuler
              </button>
              <div className="w-32 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center cursor-pointer">
                Supprimer
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* DESACTIVER UTILISATEUR */}
      <dialog id="lock_menagere" className="modal">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-md py-5 rounded-lg"
        >
          <h3
            className={
              menagereInfo && !menagereInfo.enabled
                ? "font-bold text-xl text-center text-red-600"
                : "font-bold text-xl text-center text-green-600"
            }
          >
            {menagereInfo && !menagereInfo.enabled
              ? "Désactiver cette ménagère"
              : "Activer cette ménagère"}
          </h3>
          <p className="text-lg text-center py-4">
            {menagereInfo && !menagereInfo.enabled
              ? "Cette ménagère sera désactiver et ne pourra se connecter"
              : "Cette ménagère sera à nouveau activé"}
          </p>
          <div className="modal-action flex justify-center gap-x-3">
            {!desactiveLoading ? (
              <button
                id="desactive-warning-btn"
                className="bg-gray-300 text-black text-sm font-medium w-32 h-10 rounded-md cursor-pointer flex items-center justify-center"
              >
                Annuler
              </button>
            ) : (
              <button className="bg-gray-300 text-black text-sm font-medium w-32 h-10 rounded-md flex items-center justify-center pointer-events-none">
                Annuler
              </button>
            )}
            <button
              disabled={desactiveLoading}
              className={
                menagereInfo && !menagereInfo.enabled
                  ? "bg-red-600 text-white text-sm font-medium w-32 h-10 rounded-md flex items-center justify-center"
                  : "bg-green-600 text-white text-sm font-medium w-32 h-10 rounded-md flex items-center justify-center"
              }
              // onClick={changerEtatUtilisateur}
            >
              {!desactiveLoading ? (
                <>
                  {menagereInfo && !menagereInfo.enabled ? (
                    <span>Désactiver</span>
                  ) : (
                    <span>Activer</span>
                  )}
                </>
              ) : (
                <ThreeDots
                  height="20"
                  width="40"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={desactiveLoading}
                />
              )}
            </button>
          </div>
        </form>
      </dialog>

      {/* SNACKBAR SUCCESS */}
      {successMessage ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbarSuccessOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbarSuccess}
          key={vertical + horizontal}
        >
          <div className="bg-green-500 text-white px-10 py-3 rounded-lg">
            {successMessage}
          </div>
        </Snackbar>
      ) : null}

      {/* SNACKBAR ERROR */}
      {errorMessage ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbarErrorOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbarError}
          key={vertical + horizontal}
        >
          <div className="bg-red-500 text-white px-10 py-3 rounded-lg">
            {errorMessage}
          </div>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default MenagereIndependante;
