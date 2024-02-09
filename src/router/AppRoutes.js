import React from "react";
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthGuard";
import Login from "../views/login/Login";
import NotFound from "../views/404/NotFound";
import ForgetPassword from "../views/forget-password/ForgetPassword";
import Dashboard from "../views/dashboard/Dashboard";
import Publicite from "../views/publicite/Publicite";
import Clients from "../views/clients/Clients";
import Parametres from "../views/parametres/Parametres";
import HistoriqueTransaction from "../views/historique-transaction/HistoriqueTransaction";
import Commandes from "../views/commandes/Commandes";
import Utilisateurs from "../views/utilisateurs/Utilisateurs";
import Indentifiant from "../views/identifiant/Indentifiant";
import Publications from "../views/publications/Publications";
import Partenaires from "../views/partenaires/Partenaires";



const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Outlet />;
};

const Router = createHashRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
 
  {
    path: "/",
    element: <Navigate replace to="/login" />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/publications",
        element:<Publications />,
      },
      {
        path: "/publicite",
        element: <Publicite />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/transactions",
        element: <HistoriqueTransaction />,
      },
      {
        path: "/commandes",
        element: <Commandes />,
      },
      {
        path: "/utilisateurs",
        element: <Utilisateurs />,
      },
      {
        path: "/identifiant",
        element: <Indentifiant />,
      },
      {
        path:"/partenaires",
        element: <Partenaires />,
      },
      {
        path: "/parametres",
        element: <Parametres />,
      },
      
    ],
  },
]);

export default Router;
