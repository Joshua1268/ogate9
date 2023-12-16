import React, { useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import HistoriquePaiement from "./HistoriquePaiement";
import HistoriqueRechargement from "./HistoriqueRechargement";
import HistoriqueDebit from "./HistoriqueDebit";

const HistoriqueTransaction = () => {
  const [view, setView] = useState("PAIEMENT");

  return (
    <BaseLayout>
      <div className="w-full pt-8 px-5">
        <h1 className="text-3xl text-black font-bold">
          Historique des Transactions
        </h1>
        <div className="mt-6 h-full flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row lg:flex-row md:w-fit lg:w-fit w-full bg-gray-100  rounded-lg">
            <button
              className={`w-content h-full px-4 py-2 md:py-2 lg:py-2 rounded-lg ${
                view === "PAIEMENT"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("PAIEMENT")}
            >
              Paiements
            </button>
            <button
              className={`w-content h-full px-4 py-2 md:py-2 lg:py-2 rounded-lg ${
                view === "RECHARGEMENT"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("RECHARGEMENT")}
            >
              Rechargement
            </button>
            <button
              className={`w-content h-full px-4 py-2 md:py-2 lg:py-2 rounded-lg ${
                view === "DEBIT"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("DEBIT")}
            >
              Débit
            </button>
          </div>

          <div>
            {view === "PAIEMENT" ? (
              <HistoriquePaiement />
            ) : view === "RECHARGEMENT" ? (
              <HistoriqueRechargement />
            ) : view === "DEBIT" ? (
              <HistoriqueDebit />
            ) : null}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HistoriqueTransaction;
