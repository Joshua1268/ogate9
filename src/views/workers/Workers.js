import React, { useEffect, useState } from "react";
import BaseLayout from "../../layout/BaseLayout";
import Entreprise from "./Entreprise";
import MenagereIndependante from "./MenagereIndpendante";

const Workers = () => {
  const [view, setView] = useState("ENTREPRISE");

  return (
    <BaseLayout>
      <div className="w-full py-8 px-5">
        <h1 className="text-3xl text-black font-bold">
          Publicités
        </h1>

        <div className="mt-10">
          <div className="flex items-center bg-gray-100 w-fit h-10 rounded-lg">
            <button
              className={`w-content h-full px-4 rounded-lg ${view === "ENTREPRISE"
                ? "bg-primary text-white"
                : "bg-gray-100 text-black"
                }`}
              onClick={() => setView('ENTREPRISE')}
            >
              Publicités
            </button>
            
          </div>

          {view === "ENTREPRISE" ? <Entreprise /> : <MenagereIndependante />}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Workers;
