import React, { useEffect, useState } from "react";
import { Drawer, Pagination, Snackbar } from "@mui/material";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AlertCircle, Eye, Pencil, Trash } from "lucide-react";

import {
  enregistrerHoraire,
  exportToutLesHoraire,
  rechercherListeHorairesParPage,
  supprimerHoraire,
} from "../../../services/horaire/HoraireRequest";

import { rechercherListePays } from "../../../services/pays/PaysResquets";

const Horaire = () => {
  const [pageQuery, setPageQuery] = useState({
    page: 0,
    size: 5,
    nombrePage: 1,
  });
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

  const [HoraireListe, setHoraireListe] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paysListe, setPaysListe] = useState([]);
  const [heurePays, setHeurePays] = useState("");
  const [HoraireInfo, setHoraireInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paysSearchId, setPaysSearchId] = useState("");
  const [paysId, setPaysId] = useState("");
  const { vertical, horizontal } = snackbarPosition;

  console.log(heurePays);

  const rechercheAllPays = () => {
    setLoadingData(true);
    rechercherListePays()
      .then((res) => {
        setLoadingData(false);
        setPaysListe(res.data.donnee);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
  };

  const rechercheAllHoraire = () => {
    setLoadingData(true);
    const Horaire = {
      heure: " ",
      paysId: " ",
    };
    rechercherListeHorairesParPage(pageQuery.page, pageQuery.size, Horaire)
      .then((res) => {
        setLoadingData(false);
        setHoraireListe(res.data.donnee.heures);
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

  const clearImputEnregistrement = () => {
    setPaysId(" ");
    setHeurePays(" ");
  };

  const enregistrementDesHoraire = () => {
    setLoadingData(true);
    if (HoraireInfo === null) {
      const dataHoraire = {
        heure: heurePays + ":00",
        paysId: paysId,
      };
      enregistrerHoraire(dataHoraire)
        .then((res) => {
          setLoadingData(false);
          console.log(res);
          setSuccessMessage("Horaire enregistrée avec succès");
          setSnackbarOpenSuccess(true);
          clearImputEnregistrement();
          rechercheAllHoraire();
          document.getElementById("fermer_modal_Horaire").click();
        })
        .catch((err) => {
          setLoadingData(false);
          setErrorMessage("Erreur d'enregistrement, rééssayer!");
          setSnackbarOpenError(true);
          console.log("api error", err);
        });
    } else {
      const dataHoraire = {
        heure: heurePays,
        paysId: paysId,
        id: HoraireInfo.id,
      };
      enregistrerHoraire(dataHoraire)
        .then((res) => {
          setLoadingData(false);
          console.log(res);
          setSuccessMessage("Horaire modifiée avec succès");
          setSnackbarOpenSuccess(true);
          clearImputEnregistrement();
          document.getElementById("fermer_modal_Horaire").click();
          rechercheAllHoraire();
        })
        .catch((err) => {
          setLoadingData(false);
          if (err.response.data) {
            setErrorMessage(err.response.data.donnee);
            setSnackbarOpenError(true);
          }
          setErrorMessage("Erreur de modification, rééssayer!");
          setSnackbarOpenError(true);
          console.log("api error", err);
        });
    }
  };

  const modalEditHoraire = (Horaire) => {
    document.getElementById("add_Horaire").click();
    setHoraireInfo(Horaire);
    setHeurePays(Horaire.heure);
    setPaysId(Horaire.pays.id);
  };

  const supprimeHoraire = () => {
    setDeleteLoading(true);
    console.log(HoraireInfo);
    supprimerHoraire(HoraireInfo.id)
      .then((res) => {
        setDeleteLoading(false);
        console.log(res);
        setSuccessMessage("Horaire suppression effectué");
        setSnackbarOpenSuccess(true);
        rechercheAllHoraire();
        document.getElementById("fermer_delete_Horaire").click();
      })
      .catch((err) => {
        setDeleteLoading(false);
        console.log("api error", err);
        setErrorMessage("Erreur de suppression, réessayez!");
        setSnackbarOpenError(true);
      });
  };

  const TableElement = ({ Horaire }) => {
    return (
      <tr>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {Horaire.pays.designation ? Horaire.pays.designation : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {Horaire.heure ? Horaire.heure : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {Horaire.creation ? Horaire.creation : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {Horaire.modification ? Horaire.modification : "-"}
        </td>
        <td className="w-40 px-4 border-b border-r">
          <div className="flex items-center gap-x-3">
            <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => {
                window.add_Horaire.showModal();
                modalEditHoraire(Horaire);
              }}
            >
              <Pencil size={16} />
            </button>
            <button
              className="bg-gray-100 p-1.5 rounded-md bg-red-200 text-red-600 cursor-pointer"
              onClick={() => {
                window.delete_Horaire.showModal();
                setHoraireInfo(Horaire);
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

  const exportData = () => {
    setLoadingExport(true);
    exportToutLesHoraire()
      .then((res) => {
        setLoadingExport(false);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        console.log(url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Liste_Horaire.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        setLoadingExport(false);
        console.log("api error", err);
      });
  };

  const searchHoraire = () => {
    setSearchLoading(true);
    const Horaire = {
      heure: heurePays,
      paysId: paysSearchId,
    };
    rechercherListeHorairesParPage(pageQuery.page, pageQuery.size, Horaire)
      .then((res) => {
        setSearchLoading(false);
        setHoraireListe(res.data.donnee.heures);
        setPageQuery((prev) => ({
          ...prev,
          nombrePage: res.data.donnee.totalPages,
        }));
      })
      .catch((err) => {
        setSearchLoading(false);
        console.log("api error", err);
      });
  };

  const handlePaginationChange = (event, value) => {
    setLoadingData(true);
    setPageQuery((prev) => ({
      ...prev,
      page: value,
      pagePagination: value,
    }));
    if (heurePays.length === 0) {
      rechercherListeHorairesParPage(value - 1, pageQuery.size, {
        heure: " ",
        paysId: paysSearchId,
      })
        .then((res) => {
          setHoraireListe(res.data.donnee.heures);
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
      rechercherListeHorairesParPage(value - 1, pageQuery.size, {
        heure: heurePays,
        paysId: paysSearchId,
      })
        .then((res) => {
          setHoraireListe(res.data.donnee.heures);
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
    rechercheAllPays();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    const Horaire = {
      heure: heurePays,
      paysId: paysSearchId,
    };
    rechercherListeHorairesParPage(pageQuery.page, pageQuery.size, Horaire)
      .then((res) => {
        setLoadingData(false);
        setHoraireListe(res.data.donnee.heures);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            {/* <input
              type="text"
              placeholder="Rechercher un élément"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="input input-bordered font-medium w-40 h-10"
            /> */}
            <select
              value={paysSearchId}
              onChange={(e) => {
                setPaysSearchId(e.target.value);
              }}
              className="select select-bordered select-sm font-medium h-10"
            >
              <option selected value="">
                Tous les pays
              </option>
              {paysListe &&
                paysListe.map((pays) => (
                  <option key={pays.id} value={pays.id}>
                    {pays.designation}
                  </option>
                ))}
            </select>

            <button
              onClick={searchHoraire}
              className="w-24 h-10 rounded-lg bg-black text-white text-sm font-medium"
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
          <div className="flex items-center gap-x-3">
            <button
              onClick={exportData}
              className="w-24 h-10 rounded-lg bg-gray-600 text-white text-sm font-medium"
            >
              Exporter
            </button>
            <button
              className="w-24 h-10 rounded-lg bg-primary text-white text-sm font-medium"
              onClick={() => {
                window.add_Horaire.showModal();
                clearImputEnregistrement();
                setHoraireInfo(null);
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
                <th className="text-sm text-black">Pays</th>
                <th className="text-sm text-black">Heure</th>
                {/* <th className="text-sm text-black">Profil</th> */}
                <th className="text-sm text-black">Date création</th>
                <th className="text-sm text-black">Date modification</th>
                <th className="text-sm text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loadingData && HoraireListe && HoraireListe.length > 0 ? (
                HoraireListe.map((item) => (
                  <TableElement key={item.id} Horaire={item} />
                ))
              ) : !loadingData && HoraireListe.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="w-full h-32 bg-white flex gap-x-2 text-red-500 items-center justify-center">
                      <AlertCircle size={18} />
                      <p className="font-medium text-red-500">
                        Aucun élément trouvé
                      </p>
                    </div>
                  </td>
                </tr>
              ) : loadingData && HoraireListe.length === 0 ? (
                <tr>
                  <td colSpan="6">
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
                  <td colSpan="6">
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

      {/* MODAL AJOUT HORAIRE */}
      <dialog id="add_Horaire" className="modal">
        <div className="modal-box rounded-lg max-w-md">
          <h3 className="font-bold text-xl text-black">
            {HoraireInfo === null ? "Nouvel Horaire" : "Modifier cet Horaire"}
          </h3>
          <div className="py-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pays</span>
              </label>
              <select
                value={paysId}
                onChange={(e) => {
                  setPaysId(e.target.value);
                }}
                className="select select-bordered select-sm font-medium h-10"
              >
                <option selected value="">
                  Sélectionner un pays
                </option>
                {paysListe &&
                  paysListe.map((pays) => (
                    <option key={pays.id} value={pays.id}>
                      {pays.designation}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Heure</span>
              </label>
              <input
                type="time"
                value={heurePays}
                onChange={(e) => {
                  setHeurePays(e.target.value);
                }}
                placeholder="12h30"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-x-3">
              <button
                id="fermer_modal_Horaire"
                className="w-32 h-10 bg-gray-300 font-medium text-gray-700 rounded-lg"
              >
                Annuler
              </button>
              {HoraireInfo === null ? (
                <div
                  onClick={enregistrementDesHoraire}
                  className="w-32 h-10 bg-primary font-medium text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  Enregistrer
                </div>
              ) : (
                <div
                  onClick={enregistrementDesHoraire}
                  className="w-32 h-10 bg-primary font-medium text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  Modifier
                </div>
              )}
            </form>
          </div>
        </div>
      </dialog>

      {/* MODAL DELETE PAYS */}
      <dialog id="delete_Horaire" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-center text-red-600">
            Supprimer ce pays
          </h3>
          <div className="py-4">
            <p className="text-center text-lg text-black">
              Attention action est irrversible et entrainera la suppression de
              l'élément
            </p>
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="flex gap-x-3">
              {/* if there is a button in form, it will close the modal */}
              <button
                id="fermer_delete_Horaire"
                className="w-32 h-10 bg-gray-300 text-gray-700 rounded-lg"
              >
                Annuler
              </button>

              <button
                disabled={deleteLoading}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center"
                onClick={supprimeHoraire}
              >
                {!deleteLoading ? (
                  <span>Supprimer</span>
                ) : (
                  <ThreeDots
                    height="20"
                    width="40"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={deleteLoading}
                  />
                )}
              </button>
            </form>
          </div>
          <div className="text-center text-red-600 mt-6">{errorMessage}</div>
        </div>
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

export default Horaire;
