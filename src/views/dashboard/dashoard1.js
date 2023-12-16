import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import Chart from "react-apexcharts";
import { Autocomplete, TextField } from "@mui/material";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { rechercherEntreprisesParPage } from "../../services/entreprise/EntrepriseRequest";
import { rechercherMenageresParPage } from "../../services/menagere/MenagereRequest";
import { rechercherCommandes } from "../../services/commande/CommandeRequest";
import {
  getListeAnnee,
  rechercheNombreClient,
  rechercherGraphe,
  rechercherStatistiques,
  rechercheGrapheMontantGenere,
} from "../../services/statistique/StatistiqueRequest";
import { rechercherClients } from "../../services/clientMyra/ClientMyraRequest";
import { rechercherListePays } from "../../services/pays/PaysResquets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loadingStat, setLoadingStat] = useState(false);
  const [entrepriseSelected, setEntrepriseSelected] = useState(undefined);
  const [menagereSelected, setMenagereSelected] = useState(undefined);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState("");
  const [autocompleteInputValue2, setAutocompleteInputValue2] = useState("");
  const [listeAnnee, setListeAnnee] = useState([]);
  const [paysListe, setPaysListe] = useState([]);
  const [paysId, setPaysId] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [periode, setPeriode] = useState("MOIS");
  const [loadingData, setLoadingData] = useState(false);
  const [menageresNbre, setMenageresNbre] = useState("");
  const [entrepriseNumber, setEntrepriseNumber] = useState("");
  // const [commandeListe, setcommandeListe] = useState([]);
  const [clientNbre, setClientNbre] = useState("");
  const [commandeAccepter, setCommandeAccepter] = useState("");
  const [commandeEnAttente, setCommandeEnAttente] = useState("");
  const [commandeRefuser, setCommandeRefuser] = useState("");
  const [montantTotalGenerer, setMontantTotalGenerer] = useState("");
  const [graphOptions, setGraphOptions] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false,
        },
      },
      dataLabels: { enabled: true },
      xaxis: {
        categories: [],
        title: {
          text: "Montant",
        },
      },
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });
  const [pageQuery, setPageQuery] = useState({
    page: 0,
    size: 100,
    nombrePage: 1,
  });
  const [statistique, setStatistique] = useState([]);
  const listeMois = [
    {
      libelle: "Janvier",
      value: 1,
    },
    {
      libelle: "Février",
      value: 2,
    },
    {
      libelle: "Mars",
      value: 3,
    },
    {
      libelle: "Avril",
      value: 4,
    },
    {
      libelle: "Mai",
      value: 5,
    },
    {
      libelle: "Juin",
      value: 6,
    },
    {
      libelle: "Juillet",
      value: 7,
    },
    {
      libelle: "Août",
      value: 8,
    },
    {
      libelle: "Septembre",
      value: 9,
    },
    {
      libelle: "Octobre",
      value: 10,
    },
    {
      libelle: "Novembre",
      value: 11,
    },
    {
      libelle: "Décembre",
      value: 12,
    },
  ];

  const recupereListeDesAnnee = () => {
    getListeAnnee()
      .then((res) => {
        setListeAnnee(res.data.donnee);
      })
      .catch((err) => {
        console.log("api error", err);
      });
  };

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

  const formatMoney = (money) => {
    const formattedMoney = money.toLocaleString("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    });

    return formattedMoney;
  };

  const graphPerformence = () => {
    setLoadingStat(true);

    const parameter = {
      annee: annee,
      paysId: paysId,
    };
    rechercherGraphe(parameter)
      .then((res) => {
        setLoadingStat(false);

        const graph = {
          options: {
            chart: {
              id: "apexchart-example",
              toolbar: {
                show: false,
              },
            },
            dataLabels: { enabled: true },
            labels: [
              "Jan",
              "Fev",
              "Mar",
              "Avr",
              "Mai",
              "Jun",
              "Jul",
              "Aou",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            xaxis: {
              categories: res.data.donnee.categories,
              title: {
                text: "",
              },
            },
          },
          series: [
            {
              name: "",
              data: res.data.donnee.series,
            },
          ],
        };
        setGraphOptions(graph);
      })
      .catch((err) => {
        setLoadingStat(false);
        console.log("api error", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("myra_access_api");
          navigate("/login");
        }
      });
  };

  const searchGraph = () => {
    setLoadingSearch(true);
    const parameter = {
      annee: annee,
      paysId: paysId,
    };
    rechercherGraphe(parameter)
      .then((res) => {
        setLoadingSearch(false);

        const graph = {
          options: {
            chart: {
              id: "apexchart-example",
              toolbar: {
                show: false,
              },
            },
            dataLabels: { enabled: true },
            labels: [
              "Jan",
              "Fev",
              "Mar",
              "Avr",
              "Mai",
              "Jun",
              "Jul",
              "Aou",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            xaxis: {
              categories: res.data.donnee.categories,
              title: {
                text: "",
              },
            },
          },
          series: [
            {
              name: "",
              data: res.data.donnee.series,
            },
          ],
        };
        setGraphOptions(graph);
      })
      .catch((err) => {
        setLoadingSearch(false);
        console.log("api error", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("myra_access_api");
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    setLoadingData(true);
    rechercherStatistiques().then((res) => {
      setLoadingData(false);
      setStatistique(res.data.donnee);
      setMontantTotalGenerer(res.data.donnee.montantTotalGenerer);
      setClientNbre(res.data.donnee.nombreClient);
      setCommandeAccepter(res.data.donnee.nombreCommandeAccepter);
      setCommandeRefuser(res.data.donnee.nombreCommandeAnnules);
      setCommandeEnAttente(res.data.donnee.nombreCommandeAttente);
      setEntrepriseNumber(res.data.donnee.nombreEntreprise);
      setMenageresNbre(res.data.donnee.nombreMenageres);
    });
  }, []);

  useEffect(() => {
    const date = new Date();
    setAnnee(date.getFullYear());
    setMois(date.getMonth() + 1);
    setListeAnnee([date.getFullYear()]);

    recupereListeDesAnnee();
    graphPerformence();
    rechercheAllPays();
  }, []);

  return (
    <BaseLayout>
      <div className="w-full py-8 px-5">
        <h1 className="text-3xl text-black font-bold">Tableau de bord</h1>
        <div className="w-full mt-7">
          {/* FILTRE */}
          <div className="w-full flex items-center justify-between mb-2">
            {/* <h3 className="text-base text-gray-400"></h3> */}
            <div className="flex items-center justify-end flex-wrap gap-2">
              <div>
                <select
                  disabled={loadingStat}
                  className="select select-bordered select-sm w-fit h-10"
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                >
                  <option value="MOIS">Mensuel</option>
                  <option value="ANNEE">Annuel</option>
                </select>
              </div>
              {periode === "MOIS" ? (
                <div>
                  <select
                    disabled={loadingStat}
                    className="select select-bordered select-sm w-fit h-10"
                    value={mois}
                    onChange={(e) => setMois(e.target.value)}
                  >
                    <option value="">Tous</option>
                    {listeMois.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.libelle}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              <div>
                <select
                  disabled={loadingStat}
                  className="select select-bordered select-sm w-fit h-10"
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                >
                  {listeAnnee.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={paysId}
                onChange={(e) => {
                  setPaysId(e.target.value);
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
              {/* <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo-dashboard"
                value={entrepriseSelected}
                onChange={(event, newValue) => {
                  setEntrepriseSelected(newValue);
                }}
                inputValue={autocompleteInputValue}
                onInputChange={(event, newInputValue) => {
                  setAutocompleteInputValue(newInputValue);
                }}
                options={entrepriseListe.map((entreprise) => {
                  return {
                    label: entreprise.raisonSocial,
                    id: entreprise.id,
                  };
                })}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.label}
                sx={{
                  width: 180,
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  fontSize: 14,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Entreprise" />
                )}
              />

              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo-dashboard"
                value={menagereSelected}
                onChange={(event, newValue) => {
                  setMenagereSelected(newValue);
                }}
                inputValue={autocompleteInputValue2}
                onInputChange={(event, newInputValue) => {
                  setAutocompleteInputValue2(newInputValue);
                }}
                options={menagereListe.map((menagere) => {
                  return {
                    label: `${menagere.nom} ${menagere.prenoms}`,
                    id: menagere.id,
                  };
                })}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.label}
                sx={{
                  width: 180,
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  fontSize: 14,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ménagère" />
                )}
              /> */}
              {/* {console.log(menagereSelected, entrepriseSelected)} */}

              {/* <button className="w-24 h-9 rounded-lg bg-black text-white text-sm font-medium">
                Rechercher
              </button> */}
              <button
                disabled={loadingSearch}
                className="w-24 h-9 rounded-lg bg-black text-white text-sm font-medium"
                onClick={searchGraph}
              >
                {!loadingSearch ? (
                  "Rechercher"
                ) : (
                  <ThreeDots
                    height="18"
                    width="35"
                    radius="9"
                    color="#000"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={loadingSearch}
                  />
                )}
              </button>
              {/* <button className="w-24 h-9 rounded-lg bg-primary text-white text-sm font-medium">
                Exporter
              </button> */}
            </div>
          </div>
          {/* STATISTIQUES 1 */}
          <div className="w-full grid grid-cols-3 gap-3 mt-5">
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium   flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    entrepriseNumber
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Entreprises inscrites
              </p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium   flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    menageresNbre
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Menagères inscrites
              </p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    clientNbre
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Clients enregistrés
              </p>
            </div>
          </div>
          {/* STATISTIQUES 2 */}
          <div className="w-full grid grid-cols-4 gap-3 mt-5">
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-4">
              <div className="flex items-center gap-x-1.5">
                <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium   flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    commandeEnAttente
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Commandes en attentes
              </p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-4">
              <div className="flex items-center gap-x-1.5">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium   flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    commandeAccepter
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Commandes validées
              </p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-4">
              <div className="flex items-center gap-x-1.5">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium   flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    commandeRefuser
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Commandes annulées
              </p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-4">
              <div className="flex items-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <div className="w-full rounded-lg text-black text-sm font-medium   flex gap-x-2  items-center justify-center">
                      <ThreeDots
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
                  ) : (
                    formatMoney(montantTotalGenerer)
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">
                Montant total généré
              </p>
            </div>
          </div>

          {/* CHART */}
          <div className="w-full mt-14 pb-10">
            <p className="text-center text-lg text-black font-medium underline">
              Performances
            </p>
            <Chart
              options={graphOptions.options}
              series={graphOptions.series}
              type="bar"
              height={350}
            />
            <p className="text-sm text-black text-center -mt-5 font-bold">
              Période
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
