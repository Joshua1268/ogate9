import React, { useEffect, useState } from "react";
import { Drawer, Pagination, Snackbar } from "@mui/material";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AlertCircle, Eye, Pencil, Trash } from "lucide-react";
import Face2Icon from "@mui/icons-material/Face2";
import { MultiSelect } from "react-multi-select-component";
import { rechercherEntreprisesParPage } from "../../services/entreprise/EntrepriseRequest";
import { rechercherMenageresParPage } from "../../services/menagere/MenagereRequest";

const languageOption = {
  allItemsAreSelected: "Tous les items sont selectionnées.",
  clearSearch: "Vider la recherche",
  clearSelected: "Vider la selection",
  noOptions: "Pas d'options",
  search: "Rechercher",
  selectAll: "Tout choisir",
  selectAllFiltered: "Tout choisir (Filtré)",
  selectSomeItems: "Selectionner...",
  create: "Créer",
};

const Entreprise = () => {
  const [pageQuery, setPageQuery] = useState({
    page: 0,
    size: 5,
    nombrePage: 1,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [desactiveLoading, setDesactiveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  // const [uploadLoading, setUploadLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [snackbarSuccessOpen, setSnackbarOpenSuccess] = useState(false);
  const [snackbarErrorOpen, setSnackbarOpenError] = useState(false);
  const [snackbarPosition, setSnackbarPosition] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const [entrepriseInfo, setEntrepriseInfo] = useState(null);
  const [entrepriseMenagere, setEntrepriseMenagere] = useState([0, 1, 2, 3, 4]);
  const [listeMenagere, setListeMenagere] = useState([
    {
      label: "Nda Adams",
      value: "USER_1",
      nom: "John",
      prenoms: "Legend",
      numero: "0596834423",
      email: "john@gmail.com",
      groupe: "Groupe 001",
    },
    {
      label: "Franck Romaric",
      value: "USER_2",
      nom: "John",
      prenoms: "Legend",
      numero: "0596834423",
      email: "john@gmail.com",
      groupe: "Groupe 002",
    },
    {
      label: "Grâce Bérénice",
      value: "USER_3",
      nom: "John",
      prenoms: "Legend",
      numero: "0596834423",
      email: "john@gmail.com",
      groupe: "Groupe 003",
    },
    {
      label: "Sam Yamada",
      value: "USER_4",
      nom: "John",
      prenoms: "Legend",
      numero: "0596834423",
      email: "john@gmail.com",
      groupe: "Groupe 004",
    },
    {
      label: "Kouassi Franck Alex",
      value: "USER_5",
      nom: "John",
      prenoms: "Legend",
      numero: "0596834423",
      email: "john@gmail.com",
      groupe: "Groupe 004",
    },
    {
      label: "Kouamelan Amandine",
      value: "USER_6",
      nom: "John",
      prenoms: "Legend",
      numero: "0596834423",
      email: "john@gmail.com",
      groupe: "Groupe 004",
    },
  ]);
  const [selectedMenagere, setSelectedMenagere] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fichierAgent, setFichierAgent] = useState("");
  // const [tacheInfo, setTacheInfo] = useState(null);
  const [paysId, setPaysId] = useState("");
  const [menageresListe, setMenageresListe] = useState([]);
  // const [deleteLoading, setDeleteLoading] = useState(false);
  // const [loadingExport, setLoadingExport] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [entrepriseId, setEntrepriseId] = useState("");
  const [entrepriseListe, setEntrepriseListe] = useState([]);

  const { vertical, horizontal } = snackbarPosition;

  const rechercheAllMenageres = () => {
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
          {user.nomResponsable ? user.nomResponsable : "-"}{" "}
          {user.prenomsReponsable ? user.prenomsReponsable : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.raisonSocial ? user.raisonSocial : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.adresse ? user.adresse : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.emailResponsable ? user.emailResponsable : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.numeroResponsable ? user.numeroResponsable : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.menagere ? user.menagere : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.creation ? user.creation : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {user.modification ? user.modification : "-"}
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
            </button> */}
            <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => setOpenModalMenagere(user)}
            >
              <Face2Icon sx={{ fontSize: 16 }} />
            </button>
            {/* <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => {
                window.add_entreprise.showModal();
                setEntrepriseInfo(user);
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
                window.lock_entreprise.showModal();
                setEntrepriseInfo(user);
              }}
            >
              {user.enabled ? "Désactiver" : "Activer"}
            </button>

            <button
              className="bg-gray-100 p-1.5 rounded-md bg-red-200 text-red-600 cursor-pointer"
              onClick={() => {
                window.delete_entreprise.showModal();
                setEntrepriseInfo(user);
              }}
            >
              <Trash size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const setOpenModalMenagere = (element) => {
    setEntrepriseInfo(element);
    window.add_menagere_entreprise.showModal();
  };

  const handleCloseSnackbarSuccess = () => {
    setSnackbarOpenSuccess(false);
  };

  const handleCloseSnackbarError = () => {
    setSnackbarOpenError(false);
  };

  const handleFileInput = (e) => {
    const fileUploaded = e.target.files[0];

    if (fileUploaded || fileUploaded !== undefined) {
      setFichierAgent(fileUploaded);
    }
  };

  const ajouterMenagereListeEntreprise = () => {};

  const searchEntreprises = () => {
    setSearchLoading(true);

    if (searchTerm === "" && paysId !== "") {
      const Menageres = {
        entrepriseId: " ",
        param: searchTerm,
      };
      rechercherEntreprisesParPage(pageQuery.page, pageQuery.size, Menageres)
        .then((res) => {
          setSearchLoading(false);
          setEntrepriseListe(res.data.donnee.entreprises);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
        })
        .catch((err) => {
          console.log("api error", err);
        });
    } else {
      const Menageres = {
        entrepriseId: " ",
        param: searchTerm,
      };
      rechercherEntreprisesParPage(pageQuery.page, pageQuery.size, Menageres)
        .then((res) => {
          setSearchLoading(false);
          setEntrepriseListe(res.data.donnee.entreprises);
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
      param: " ",
    };
    if (searchTerm.length === 0) {
      rechercherEntreprisesParPage(value - 1, pageQuery.size, Menageres)
        .then((res) => {
          setEntrepriseListe(res.data.donnee.entreprises);
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
      rechercherEntreprisesParPage(value - 1, pageQuery.size, Menageres)
        .then((res) => {
          setEntrepriseListe(res.data.donnee.entreprises);
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

  // useEffect(() => {
  //   rechercheAllMenageres();
  // }, []);

  useEffect(() => {
    setLoadingData(true);
    const Menageres = {
      entrepriseId: " ",
      param: " ",
    };
    rechercherEntreprisesParPage(pageQuery.page, pageQuery.size, Menageres)
      .then((res) => {
        setLoadingData(false);
        setEntrepriseListe(res.data.donnee.entreprises);
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

  console.log(pageQuery.page);

  return (
    <div>
      <div className="w-full mt-7">
        <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4 justify-between">
          <div className="flex lg:flex-row md:flex-row flex-col w-full items-center gap-3">
            <input
              type="text"
              placeholder="Rechercher un élément"
              className="input input-bordered font-medium md:w-48 lg:w-48 w-full h-10"
            />
            <button
              onClick={searchEntreprises}
              className="md:w-24 lg:w-24 w-full h-10 rounded-lg bg-black text-white text-sm font-medium"
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
          <div className="flex lg:flex-row md:flex-row w-full justify-end flex-col items-center gap-3">
            <button className="lg:w-24 md:w-24 w-full h-10 rounded-lg bg-gray-600 text-white text-sm font-medium">
              Exporter
            </button>
            <button
              className="lg:w-24 md:w-24 w-full h-10 rounded-lg bg-primary text-white text-sm font-medium"
              onClick={() => {
                window.add_entreprise.showModal();
                setEntrepriseInfo(null);
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
                <th className="text-sm text-black">Nom & prénoms</th>
                <th className="text-sm text-black">Raison sociale</th>
                <th className="text-sm text-black">Adresse</th>
                <th className="text-sm text-black">Email</th>
                <th className="text-sm text-black">Téléphone</th>
                <th className="text-sm text-black">Nombre ménagère</th>
                <th className="text-sm text-black">Date création</th>
                <th className="text-sm text-black">Date modification</th>
                <th className="text-sm text-black">
                  <div className="statut">Statut</div>
                </th>
                <th className="text-sm text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loadingData && entrepriseListe.length > 0 ? (
                entrepriseListe.map((item) => (
                  <TableElement key={item.id} user={item} />
                ))
              ) : !loadingData && entrepriseListe.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="w-full h-32 bg-white flex gap-x-2 text-red-500 items-center justify-center">
                      <AlertCircle size={18} />
                      <p className="font-medium text-red-500">
                        Aucun élément trouvé
                      </p>
                    </div>
                  </td>
                </tr>
              ) : loadingData && entrepriseListe.length === 0 ? (
                <tr>
                  <td colSpan="9">
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
                  <td colSpan="9">
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
          <h3 className="text-2xl font-semibold">Détail de l'entreprise</h3>
        </div>
      </Drawer>

      {/* MODAL AJOUT ENTREPRISE */}
      <dialog id="add_entreprise" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-black">
            {entrepriseInfo === null
              ? "Nouvelle entreprise"
              : "Modifier cette entreprise"}
          </h3>
          <div className="py-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Raison sociale</span>
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
                {entrepriseInfo === null ? "Enregistrer" : "Modifier"}
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* MODAL LISTE MENAGERE DE L'ENTREPRISE */}
      <dialog id="add_menagere_entreprise" className="modal">
        <div className="modal-box rounded-lg max-w-3xl">
          <h3 className="font-bold text-xl text-left text-primary">
            Menagères de l'entreprise
          </h3>
          <div className="my-4 flex items-start gap-x-3">
            <div className="w-1/2">
              <div className="w-full">
                <label className="label">
                  <span className="label-text text-xs">Ménagère</span>
                </label>
                <MultiSelect
                  options={menageresListe.map((menagere) => ({
                    label: `${menagere.nom} ${menagere.prenoms}`,
                    value: menagere.id,
                  }))}
                  value={selectedMenagere}
                  onChange={setSelectedMenagere}
                  overrideStrings={languageOption}
                  labelledBy="Choisir une ménagère"
                />
              </div>
              <div className="w-full modal-action justify-start mt-2">
                {!addLoading ? (
                  <form method="dialog" className="w-full">
                    <button className="w-full bg-black text-sm text-white font-semibold px-4 py-2 rounded-md cursor-pointer">
                      Annuler
                    </button>
                  </form>
                ) : (
                  <button className="bg-black text-sm text-white font-semibold px-4 py-2 rounded-md pointer-events-none">
                    Annuler
                  </button>
                )}
                <div
                  disabled={addLoading}
                  className="w-full bg-primary flex items-center justify-center text-white text-sm font-semibold px-4 py-2 rounded-md cursor-pointer"
                  onClick={ajouterMenagereListeEntreprise}
                >
                  {!addLoading ? (
                    <span>Ajouter</span>
                  ) : (
                    <ThreeDots
                      height="20"
                      width="40"
                      radius="9"
                      color="#000"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={addLoading}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/2 pt-2">
              <h4 className="text-center text-sm text-black font-semibold">
                Ménagères associées
              </h4>

              <div className="h-60 max-h-60 mt-3 overflow-y-scroll flex flex-col gap-y-3">
                {entrepriseMenagere.length !== 0 ? (
                  entrepriseMenagere.map((item, index) => (
                    <div
                      key={index}
                      className="w-full h-12 rounded-md border bg-stone-100 px-4 py-2 flex items-center justify-between"
                    >
                      <p className="text-sm">N'da Adams Aimé-Désiré</p>
                      <div className="p-1 -mr-1 cursor-pointer text-red-600 cursor-pointer">
                        <Trash size={18} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-10">
                    <p className="text-center text-red-600 text-sm font-normal">
                      Aucune ménagères trouvées
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {/* MODAL DELETE ENTREPRISE */}
      <dialog id="delete_entreprise" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-center text-red-600">
            Supprimer cette entreprise
          </h3>
          <div className="py-4">
            <p className="text-center text-lg text-black">
              Attention action est irrversible et entrainera la suppression de
              l'entreprise
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
      <dialog id="lock_entreprise" className="modal">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-md py-5 rounded-lg"
        >
          <h3
            className={
              entrepriseInfo && !entrepriseInfo.enabled
                ? "font-bold text-xl text-center text-red-600"
                : "font-bold text-xl text-center text-green-600"
            }
          >
            {entrepriseInfo && !entrepriseInfo.enabled
              ? "Désactiver cet utilisateur"
              : "Activer cet utilisateur"}
          </h3>
          <p className="text-lg text-center py-4">
            {entrepriseInfo && !entrepriseInfo.enabled
              ? "Cet utilisateur sera désactiver et ne pourra se connecter"
              : "Cet utilisateur sera à nouveau activé"}
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
                entrepriseInfo && !entrepriseInfo.enabled
                  ? "bg-red-600 text-white text-sm font-medium w-32 h-10 rounded-md flex items-center justify-center"
                  : "bg-green-600 text-white text-sm font-medium w-32 h-10 rounded-md flex items-center justify-center"
              }
              // onClick={changerEtatUtilisateur}
            >
              {!desactiveLoading ? (
                <>
                  {entrepriseInfo && !entrepriseInfo.enabled ? (
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

export default Entreprise;
