import React, { useEffect } from "react";
import LOGO from "./../assets/images/myra.png";
import {
  Cog,
  KeyRound,
  LogOut,
  ShoppingBasket,
  User2,
  UserSquare2,
  Users2Icon,
  Wallet,
} from "lucide-react";
import Face2Icon from "@mui/icons-material/Face2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();

  const deconnectAdmin = () => {
    localStorage.removeItem("myra_access_api");
    navigate("/login");
  };
  const token = localStorage.getItem("myra_access_api");
  // console.log(token);

  const decodedToken = jwt_decode(token);

  // console.log(decodedToken);
  return (
    <div className=" pattern sticky top-0 left-0 w-[280px] lg:w-[300px] xl:w-[320px] h-screen bg-primary border-r">
      <div className="relative px-3 xl:px-5 pt-5 w-full h-full">
      <h1 className="text-4xl font-Montserrat text-white font-black pl-[20px] ">O'GATE</h1>

        <div className="mt-10 main-menu flex flex-col gap-y-2 px-3">
          <NavLink to="/dashboard">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <DashboardIcon sx={{ fontSize: 20 }} />
              <span className="text-left text-sm lg:text-base">
                Tableau de bord
              </span>
            </button>
          </NavLink>
          <NavLink to="/workers">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <Face2Icon sx={{ fontSize: 20 }} />
              <span className="text-left text-sm lg:text-base">
                Publicités
              </span>
            </button>
          </NavLink>
          <NavLink to="/publications">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <Face2Icon sx={{ fontSize: 20 }} />
              <span className="text-left text-sm lg:text-base">
                Publications
              </span>
            </button>
          </NavLink>
          <NavLink to="/clients">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <UserSquare2 size={22} strokeWidth={2} />
              <span className="text-left text-sm lg:text-base">Partenaires</span>
            </button>
          </NavLink>
          <NavLink to="/clients">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <Users2Icon size={22} strokeWidth={2} />
              <span className="text-left text-sm lg:text-base">
                Clients
              </span>
            </button>
          </NavLink>
          <NavLink to="/utilisateurs">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <Users2Icon size={22} strokeWidth={2} />
              <span className="text-left text-sm lg:text-base">
                Utilisateurs
              </span>
            </button>
          </NavLink>
          <NavLink to="/parametres">
            <button className="bg-white w-full px-3 py-2.5 rounded-lg flex items-center gap-x-2 text-gray-600 font-medium">
              <Cog size={22} strokeWidth={2} />
              <span className="text-left text-sm lg:text-base">Paramètres</span>
            </button>
          </NavLink>
        </div>

        <div className="absolute left-3 lg:left-5 xl:left-6 bottom-5 w-full lg:w-10/12">
          <details className="dropdown mb- dropdown-top dropdown-end w-full">
            <summary className="m-1 btn w-full flex items-center justify-start h-14 rounded-lg gap-x-2 bg-gray-100 border border-gray-200 px-2">
              <div className="w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center">
                <User2 size={21} className="hidden lg:inline" />
                <User2 size={10} className="inline lg:hidden" />
              </div>
              <div className="">
                <p className="text-gray-700 text-left text-xs lg:text-sm font-medium normal-case">
                  {decodedToken.nom} {decodedToken.prenoms}
                </p>
                <p className="text-zinc-500 text-left text-xs lg:text-sm -mt-1 font-normal normal-case">
                  {decodedToken.email}
                </p>
              </div>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-lg border w-52">
              <li>
                <NavLink to="/identifiant">
                  <a className="text-base text-black font-medium flex items-center gap-x-1">
                    <KeyRound size={18} />
                    Identifiant
                  </a>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={deconnectAdmin}
                  className="text-base text-red-600 font-medium"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
