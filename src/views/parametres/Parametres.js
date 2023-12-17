import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import TypesPieces from "./TypePiece";
import Information from "./Information";
import Specialite from "./Specialite";
import TypeDocument from "./TypeDocument";
const Parametres = () => {
  const [view, setView] = useState("TYPE_PIECE");
  

  

  return (
    <BaseLayout>
      <div className="w-full py-8 px-5 h-full">
        <h1 className="text-3xl text-black font-bold">Paramètres</h1>

        <div className="pt-4 h-full flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row lg:flex-row md:w-fit lg:w-fit w-full bg-gray-100  rounded-lg">
            <button
              className={`w-content h-full px-4 py-2 md:py-0 lg:py-0 rounded-lg ${
                view === "TYPE_PIECE"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("TYPE_PIECE")}
            >
              Type de bien
            </button>
            <button
              className={`w-content h-full px-4 py-2 rounded-lg ${
                view === "TYPE_DOCUMENT"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("TYPE_DOCUMENT")}
            >
              Type de document
            </button>
            <button
              className={`w-content h-full px-4 py-2 rounded-lg ${
                view === "INFORMATION"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("INFORMATION")}
            >
              Informations Additionnelles
            </button>
            <button
              className={`w-content h-full px-4 py-2 rounded-lg ${
                view === "SPECIALITE"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => setView("SPECIALITE")}
            >
              Specialité
            </button>
          </div>


          <div>
            { view === "TYPE_PIECE" ? (
              <TypesPieces />
            )  : view === "TYPE_DOCUMENT" ? (
              <TypeDocument/>
            )  :view ==="INFORMATION" ?(
              <Information />
            ) :view === "SPECIALITE" ?(
              <Specialite/>
            )
            : null}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Parametres;
