import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import {
  Autocomplete,
  Drawer,
  Pagination,
  Snackbar,
  TextField,
} from "@mui/material";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AlertCircle, Eye, Trash } from "lucide-react";

import { rechercherRechargement } from "../../services/rechargement/RechargementRequest";
import { rechercherListeTypeServiceparparam } from "../../services/typeServices/TypeServiceRequest";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const HistoriqueRechargement = () => {
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
  const [RechargementInfo, setRechargementInfo] = useState(null);
  const [rechargementListe, setRechargementListe] = useState([]);
  const [typeServiceListe, setTypeServiceListe] = useState([]);
  const [groupeSelected, setGroupeSelected] = useState(undefined);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeServiceId, setTypeServiceId] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const { vertical, horizontal } = snackbarPosition;

  const rechercheAllTypeServices = () => {
    setLoadingData(true);
    rechercherListeTypeServiceparparam(pageQuery.page, pageQuery.size, " ")
      .then((res) => {
        setLoadingData(false);
        setTypeServiceListe(res.data.donnee.types);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
  };

  const TableElement = ({ rechargement }) => {
    return (
      <tr>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {rechargement.entreprise &&
          rechargement.entreprise &&
          rechargement.entreprise.raisonSocial
            ? rechargement.entreprise.raisonSocial
            : "-"}
        </td>

        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {rechargement.entreprise &&
          rechargement.entreprise &&
          rechargement.entreprise.numeroEntreprise
            ? rechargement.entreprise.numeroEntreprise
            : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {rechargement.menagere &&
          rechargement.menagere &&
          rechargement.menagere.nom
            ? rechargement.menagere.nom
            : "-"}{" "}
          {rechargement.menagere &&
          rechargement.menagere &&
          rechargement.menagere.prenoms
            ? rechargement.menagere.prenoms
            : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {rechargement.operateur.designation
            ? rechargement.operateur.designation
            : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {rechargement.montant ? `${rechargement.montant} F CFA` : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {rechargement.date ? rechargement.date : "-"}
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
              className="bg-gray-100 p-1.5 rounded-md bg-red-200 text-red-600 cursor-pointer"
              onClick={() => {
                window.delete_transaction.showModal();
                setRechargementInfo(rechargement);
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

  const searchrechargement = () => {
    setSearchLoading(true);

    const data = {
      dateDebut: dateDebut,
      dateFin: dateFin,
      param: searchTerm,
      typeServiceId: typeServiceId,
    };

    rechercherRechargement(pageQuery.page - 1, pageQuery.size)
      .then((res) => {
        setSearchLoading(false);
        setRechargementListe(res.data.donnee.liste);

        setPageQuery((prev) => ({
          ...prev,
          nombrePage: res.data.donnee.totalPages,
        }));
      })
      .catch((err) => {
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
    if (searchTerm.length !== 0) {
      const data = {
        dateDebut: dateDebut,
        dateFin: dateFin,
        param: searchTerm,
        typeServiceId: typeServiceId,
      };
      rechercherRechargement(value - 1, pageQuery.size)
        .then((res) => {
          setLoadingData(false);
          setRechargementListe(res.data.donnee.liste);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
        })
        .catch((err) => {
          setLoadingData(false);
          console.log("api error", err);
        });
    } else {
      const data = {
        dateDebut: dateDebut,
        dateFin: dateFin,
        param: searchTerm,
        typeServiceId: typeServiceId,
      };
      rechercherRechargement(value - 1, pageQuery.size)
        .then((res) => {
          setLoadingData(false);
          setRechargementListe(res.data.donnee.liste);
          setPageQuery((prev) => ({
            ...prev,
            nombrePage: res.data.donnee.totalPages,
          }));
        })
        .catch((err) => {
          setLoadingData(false);
          console.log("api error", err);
        });
    }
  };

  useEffect(() => {
    rechercheAllTypeServices();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    const data = {
      dateDebut: dateDebut,
      dateFin: dateFin,
      param: searchTerm,
      typeServiceId: typeServiceId,
    };
    rechercherRechargement(pageQuery.page, pageQuery.size)
      .then((res) => {
        setLoadingData(false);
        setRechargementListe(res.data.donnee.liste);
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

  // console.log(rechargementListe);

  return (
    <>
      <div className="w-full">
        <div className="mt-[3rem] flex-col w-full">
          <div className="flex md:flex-col lg:flex-row flex-col items-center justify-between w-full ">
            <div className="flex md:flex-col pb-1 lg:pb-0 lg:flex-row flex-col w-full items-center gap-x-3 gap-y-6 ">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un élément"
                className="input input-bordered font-medium md:w-full lg:w-48 w-full h-10"
              />
              <div className="mt-[-1.5rem] md:w-full lg:w-36 w-full">
                <label>
                  <span>Type de service</span>
                </label>
                <select
                  value={typeServiceId}
                  onChange={(e) => {
                    setTypeServiceId(e.target.value);
                  }}
                  className="select select-bordered select-sm font-medium md:w-full lg:w-36 w-full h-10"
                >
                  <option selected value="">
                    Sélectionner un service
                  </option>
                  {typeServiceListe.length > 0 &&
                    typeServiceListe.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.designation}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="mt-[-1.5rem] md:w-full lg:w-44 w-full">
                <label>
                  <span>Date début</span>
                </label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered font-medium md:w-full lg:w-44 w-full h-10"
                />
              </div>

              <div className="mt-[-1.5rem] md:w-full lg:w-44 w-full">
                <label>Date Fin</label>
                <input
                  type="date"
                  placeholder="date debut"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  className="input input-bordered font-medium md:w-full lg:w-44 w-full h-10"
                />
              </div> */}
              <button
                onClick={searchrechargement}
                className="md:w-full lg:w-24 w-full h-10 rounded-lg bg-black text-white text-sm font-medium"
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
            <div className="flex items-center md:w-full lg:w-24 w-full gap-x-3">
              <button className=" md:w-full lg:w-24 w-full h-10 rounded-lg bg-primary text-white text-sm font-medium">
                Exporter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto bg-white w-full mt-2">
            <table className="custom-table table table-sm w-full">
              <thead>
                <tr className="bg-primary/10 h-12">
                  <th className="text-sm text-black">Entreprise</th>
                  <th className="text-sm text-black">Numéro entreprise</th>
                  <th className="text-sm text-black">Ménagère</th>
                  <th className="text-sm text-black">Opérateur</th>
                  <th className="text-sm text-black">Montant</th>
                  <th className="text-sm text-black">Date rechargement</th>
                  <th className="text-sm text-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loadingData && rechargementListe.length > 0 ? (
                  rechargementListe.map((item) => (
                    <TableElement key={item.id} rechargement={item} />
                  ))
                ) : !loadingData && rechargementListe.length === 0 ? (
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
                ) : loadingData && rechargementListe.length === 0 ? (
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
      </div>

      {/* SIDEBAR DETAIL ENTREPRISE */}
      <Drawer
        anchor={"right"}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="w-[480px] px-4 pt-4">
          <h3 className="text-2xl text-black font-semibold">
            Détail de la transaction
          </h3>
        </div>
      </Drawer>

      {/* MODAL DELETE ENTREPRISE */}
      <dialog id="delete_transaction" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-center text-red-600">
            Supprimer ce transaction
          </h3>
          <div className="py-4">
            <p className="text-center text-lg text-black">
              Attention action est irrversible et entrainera la suppression du
              transaction
            </p>
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="flex gap-x-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-32 h-10 bg-gray-300 text-gray-700 font-medium rounded-lg">
                Annuler
              </button>
              <div className="w-32 h-10 bg-red-600 text-white font-medium rounded-lg flex items-center justify-center cursor-pointer">
                Supprimer
              </div>
            </form>
          </div>
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
    </>
  );
};

export default HistoriqueRechargement;
