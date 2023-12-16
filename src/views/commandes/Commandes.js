import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  Autocomplete,
  Drawer,
  Pagination,
  Snackbar,
  TextField,
} from "@mui/material";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { AlertCircle, Eye, Forward, RefreshCcw, Trash } from "lucide-react";
import { rechercherListeTypeServiceparparam } from "../../services/typeServices/TypeServiceRequest";
import { rechercherCommandes } from "../../services/commande/CommandeRequest";
import { rechercherListePays } from "../../services/pays/PaysResquets";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import FlagIcon from "@mui/icons-material/Flag";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const Commandes = () => {
  const [pageQuery, setPageQuery] = useState({
    page: 0,
    size: 7,
    nombrePage: 1,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [snackbarSuccessOpen, setSnackbarOpenSuccess] = useState(false);
  const [snackbarErrorOpen, setSnackbarOpenError] = useState(false);
  const [snackbarPosition, setSnackbarPosition] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const [commandeInfo, setcommandeInfo] = useState(null);
  const [detailCommande, setDetailCommande] = useState({});
  const [commandeListe, setcommandeListe] = useState([]);
  const [groupeSelected, setGroupeSelected] = useState(undefined);
  const [autocompleteInputValue1, setAutocompleteInputValue1] = useState("");
  const [autocompleteInputValue2, setAutocompleteInputValue2] = useState("");
  const [
    autocompleteInputValueTransfert1,
    setAutocompleteInputValueTransfert1,
  ] = useState("");
  const [
    autocompleteInputValueTransfert2,
    setAutocompleteInputValueTransfert2,
  ] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [entrepriseTransfert, setEntrepriseTransfert] = useState("");
  const [menagereTransfert, setMenagereTransfert] = useState("");
  const [checkTransfert, setCheckTransfert] = useState(false);
  const [typeServiceListe, setTypeServiceListe] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [typeServiceId, setTypeServiceId] = useState("");
  const [paysId, setPaysId] = useState("");
  const [paysListe, setPaysListe] = useState([]);

  const { vertical, horizontal } = snackbarPosition;

  const returnStatut = (statut) => {
    return statut === "ATTENTE" ? (
      <span className="w-fit px-3 py-px flex items-center justify-center gap-x-2 rounded-md text-sm">
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        En attente
      </span>
    ) : statut === "ACCEPTER" ? (
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

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  };

  const TableElement = ({ commande }) => {
    console.log(commande.dateCommande);
    const dateStr = commande.dateCommande;
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("fr-FR", options);
    return (
      <tr>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.adresse.client.nom ? commande.adresse.client.nom : "-"}{" "}
          {commande.adresse.client.prenoms
            ? commande.adresse.client.prenoms
            : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.adresse.client.numero
            ? commande.adresse.client.numero
            : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.menagere ? commande.menagere : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.entreprise ? commande.entreprise : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {formattedDate ? formattedDate : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.service.typeService.designation
            ? commande.service.typeService.designation
            : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.montantPaye ? commande.montantPaye : "-"}{" "}
          {commande.monnaie ? commande.monnaie : ""}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.date && commande.statut === "VALIDE" ? commande.date : "-"}
        </td>
        <td className="px-4 text-sm text-stone-500 font-normal border-b border-r">
          {commande.statut ? returnStatut(commande.statut) : "-"}
        </td>
        <td className="w-40 px-4 border-b border-r">
          <div className="flex items-center gap-x-3">
            <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => {
                setOpenModal(true);
                setDetailCommande(commande);
              }}
            >
              <Eye size={16} />
            </button>
            <button
              className="bg-gray-100 p-1.5 rounded-md text-gray-700 cursor-pointer"
              onClick={() => {
                window.transfert_commande.showModal();
                setcommandeInfo(commande);
              }}
            >
              <Forward size={16} />
            </button>
            {commande.statut === "ATTENTE" ? (
              <button
                className="bg-gray-100 p-1.5 rounded-md bg-green-200 text-green-600 cursor-pointer"
                onClick={() => {
                  window.delete_commande.showModal();
                  setcommandeInfo(commande);
                }}
              >
                <RefreshCcw size={16} />
              </button>
            ) : null}
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

  const rechercheAllPays = () => {
    setLoadingData(true);
    rechercherListePays()
      .then((res) => {
        setLoadingData(false);
        // console.log(res);
        setPaysListe(res.data.donnee);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
  };

  const allPaiement = () => {
    setLoadingData(true);
    const data = {
      dateDebut: "string",
      dateFin: "string",
      paysId: 0,
      typeServiceId: 0,
    };
    rechercherCommandes(pageQuery.page, pageQuery.size, data)
      .then((res) => {
        setLoadingData(false);
        setcommandeListe(res.data.donnee.commandes);
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

  const searchCommande = () => {
    setSearchLoading(true);

    const data = {
      dateDebut: dateDebut,
      dateFin: dateFin,
      paysId: paysId,
      typeServiceId: typeServiceId,
    };

    rechercherCommandes(pageQuery.page, pageQuery.size, data)
      .then((res) => {
        setSearchLoading(false);
        setcommandeListe(res.data.donnee.commandes);

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
        paysId: paysId,
        typeServiceId: typeServiceId,
      };
      rechercherCommandes(value - 1, pageQuery.size, data)
        .then((res) => {
          setLoadingData(false);
          setcommandeListe(res.data.donnee.commandes);
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
        dateDebut: "",
        dateFin: "",
        paysId: "",
        typeServiceId: "",
      };
      rechercherCommandes(value - 1, pageQuery.size, data)
        .then((res) => {
          setLoadingData(false);
          setcommandeListe(res.data.donnee.commandes);
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
    rechercheAllPays();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    const data = {
      dateDebut: "",
      dateFin: "",
      param: searchTerm,
      typeServiceId: "",
    };
    rechercherCommandes(pageQuery.page, pageQuery.size, data)
      .then((res) => {
        setLoadingData(false);
        setcommandeListe(res.data.donnee.commandes);
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
    <BaseLayout>
      <div className="w-full py-8 px-5">
        <h1 className="text-3xl text-black font-bold">Commandes</h1>
        <div className="w-full mt-10">
          <div className="flex lg:flex-row flex-col  items-center justify-between">
            <div className="flex lg:flex-row mb-4 lg:mb-0 flex-col w-full items-center gap-x-3 gap-y-6">
              <div className="mt-[-1.5rem] lg:w-40 w-full">
                <label>
                  <span>Pays</span>
                </label>
                <select
                  value={paysId}
                  onChange={(e) => {
                    setPaysId(e.target.value);
                  }}
                  className="select select-bordered select-sm font-medium lg:w-40 w-full h-10"
                >
                  <option selected value="">
                    Sélectionner un pays
                  </option>
                  {paysListe.length > 0 &&
                    paysListe.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.designation}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-[-1.5rem] lg:w-40 w-full">
                <label>
                  <span>Type services</span>
                </label>
                <select
                  value={typeServiceId}
                  onChange={(e) => {
                    setTypeServiceId(e.target.value);
                  }}
                  className="select select-bordered select-sm font-medium lg:w-40 w-full h-10"
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
              <div className="flex  flex-col mt-[-1.5rem] lg:w-44 w-full">
                <label>
                  <span>Date début</span>
                </label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered font-medium  h-10"
                />
              </div>

              <div className="flex flex-col mt-[-1.5rem] lg:w-40 w-full">
                <label>Date Fin</label>
                <input
                  type="date"
                  placeholder="date debut"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  className="input input-bordered font-medium  h-10"
                />
              </div>
            </div>
            <div className="flex items-center lg:w-[43%] w-full lg:flex-row flex-col justify-between gap-4 ">
              <button
                onClick={searchCommande}
                className="lg:w-24 w-full h-10 rounded-lg bg-black text-white text-sm font-medium"
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
              <button className="lg:w-24 w-full h-10 rounded-lg bg-primary text-white text-sm font-medium">
                Exporter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto bg-white w-full mt-2">
            <table className="custom-table table table-sm w-full">
              <thead>
                <tr className="bg-primary/10 h-12">
                  <th className="text-sm text-black">Client</th>
                  <th className="text-sm text-black">Numéro</th>
                  <th className="text-sm text-black">Menagère</th>
                  <th className="text-sm text-black">Entreprise</th>
                  <th className="text-sm text-black">Date commande</th>
                  <th className="text-sm text-black">Type de service</th>
                  <th className="text-sm text-black">Montant payé</th>
                  <th className="text-sm text-black">Achevé le</th>
                  <th className="text-sm text-black">statut</th>
                  <th className="text-sm text-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loadingData && commandeListe.length > 0 ? (
                  commandeListe.map((item) => (
                    <TableElement key={item.id} commande={item} />
                  ))
                ) : !loadingData && commandeListe.length === 0 ? (
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
                ) : loadingData && commandeListe.length === 0 ? (
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
              page={pageQuery.pagePagination}
              variant="outlined"
              shape="rounded"
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR DETAIL COMMANDE */}

      <Drawer
        anchor={"right"}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="w-[500px] flex flex-col gap-4 px-4 pt-4 ">
          <h3 className="text-2xl text-black font-semibold">
            Détail de la commande
          </h3>

          <div>
            <div className="flex flex-row justify-start gap-2">
              <h3>
                {" "}
                <span className="font-bold">Nom ménagère:</span> Larissa
              </h3>
              <h3 className="">de chez CleanJob</h3>
            </div>
            <div className="flex flex-col justify-start gap-1">
              <h3>
                <span className="font-bold">Client :</span>{" "}
                {detailCommande.adresse &&
                detailCommande.adresse.client &&
                detailCommande.adresse.client.nom
                  ? detailCommande.adresse.client.nom
                  : ""}{" "}
                {detailCommande.adresse &&
                detailCommande.adresse.client &&
                detailCommande.adresse.client.prenoms
                  ? detailCommande.adresse.client.prenoms
                  : ""}
              </h3>
              <h3>
                {" "}
                <span className="font-bold">Numéro Client:</span>{" "}
                {detailCommande.adresse &&
                detailCommande.adresse.client &&
                detailCommande.adresse.client.numero
                  ? detailCommande.adresse.client.numero
                  : ""}
              </h3>
            </div>
          </div>

          <div>
            <VerticalTimeline layout="1-column-left">
              {detailCommande.jours && detailCommande.jours.length > 0
                ? detailCommande.jours.map((item) => (
                    <VerticalTimelineElement
                      key={item.id}
                      className="vertical-timeline-element--work"
                      contentArrowStyle={{
                        borderRight: "7px solid  #37B6A4",
                      }}
                      // date={item.jour}
                      iconStyle={{ background: "#37B6A4", color: "#fff" }}
                      icon={<WorkHistoryIcon />}
                    >
                      <p className="flex flex-row justify-between w-full">
                        {item.jour}
                        <h3 className="vertical-timeline-element-title">
                          {detailCommande.statut
                            ? returnStatut(detailCommande.statut)
                            : "-"}
                        </h3>
                      </p>
                    </VerticalTimelineElement>
                  ))
                : null}
            </VerticalTimeline>
          </div>
        </div>
      </Drawer>

      {/* MODAL TRANSFERT COMMANDE */}
      <dialog id="transfert_commande" className="modal">
        <div className="modal-transfert modal-box rounded-lg">
          <h3 className="font-bold text-xl text-center text-black">
            Transférer la commande
          </h3>
          <div className="py-4">
            <div className="flex items-center justify-center gap-x-5">
              <div className="form-control">
                <label
                  className="label cursor-pointer"
                  onClick={() => setCheckTransfert(true)}
                >
                  <span className="label-text text-base mr-1">Entreprise</span>
                  <input
                    type="checkbox"
                    checked={checkTransfert}
                    className="checkbox rounded checkbox-xs checkbox-accent"
                  />
                </label>
              </div>
              <div className="form-control">
                <label
                  className="label cursor-pointer"
                  onClick={() => setCheckTransfert(false)}
                >
                  <span className="label-text text-base mr-1">Ménagère</span>
                  <input
                    type="checkbox"
                    checked={!checkTransfert}
                    className="checkbox rounded checkbox-xs checkbox-accent"
                  />
                </label>
              </div>
            </div>
            {checkTransfert ? (
              <div className="mt-5">
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  value={entrepriseTransfert}
                  onChange={(event, newValue) => {
                    setEntrepriseTransfert(newValue);
                  }}
                  inputValue={autocompleteInputValueTransfert1}
                  onInputChange={(event, newInputValue) => {
                    setAutocompleteInputValueTransfert1(newInputValue);
                  }}
                  options={top100Films}
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    fontSize: 14,
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Entreprise" />
                  )}
                />
              </div>
            ) : (
              <div className="mt-5">
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  value={menagereTransfert}
                  onChange={(event, newValue) => {
                    setMenagereTransfert(newValue);
                  }}
                  inputValue={autocompleteInputValueTransfert2}
                  onInputChange={(event, newInputValue) => {
                    setAutocompleteInputValueTransfert2(newInputValue);
                  }}
                  options={top100Films}
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    fontSize: 14,
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Ménagère" />
                  )}
                />
              </div>
            )}
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="flex gap-x-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-32 h-10 bg-gray-300 text-gray-700 font-medium rounded-lg">
                Annuler
              </button>
              <div className="w-32 h-10 bg-primary text-white font-medium rounded-lg flex items-center justify-center cursor-pointer">
                Transférer
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* MODAL DELETE ENTREPRISE */}
      <dialog id="delete_commande" className="modal">
        <div className="modal-box rounded-lg">
          <h3 className="font-bold text-xl text-center text-red-600">
            Supprimer ce commande
          </h3>
          <div className="py-4">
            <p className="text-center text-lg text-black">
              Attention action est irrversible et entrainera la suppression du
              commande
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
    </BaseLayout>
  );
};

export default Commandes;
