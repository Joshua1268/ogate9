import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import LOGO_WHITE from "./../../assets/images/logo_white.svg";
import { ThreeDots } from "react-loader-spinner";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  // {
  //   "newPassword": "string",
  //   "password": "string",
  //   "passwordConfirm": "string"
  // }

  useEffect(() => {
    function isEventExpired(currentDate, endDateInMilliseconds) {
      // Convert the milliseconds to a Date object
      const endDate = new Date(endDateInMilliseconds);

      // Compare the two dates
      if (currentDate > endDate) {
        // Event has expired
        return true;
      } else {
        // Event is still within time
        return false;
      }
    }

    if (localStorage.getItem("myra_access_api")) {
      const currentDate = new Date();
      const decodedToken = jwt_decode(localStorage.getItem("myra_access_api"));
      const expirationDate = new Date(decodedToken.exp * 1000);

      if (isEventExpired(currentDate, expirationDate)) {
        console.log("Login again");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="pattern w-1/2 min-h-screen bg-primary flex items-center justify-center">
        <img src={LOGO_WHITE} className="w-44" />
      </div>
      <div className="w-1/2 h-full bg-zinc-50">
        <div className="w-80 lg:w-96 mx-auto h-fit rounded-lg">
          <h1 className="text- text-2xl lg:text-3xl text-black font-bold mt-2">
            Mot de passe oublié
          </h1>
          <p className="mt-3 text-zinc-500">
            Entrez votre adresse email pour réinitialiser votre mot de passe
          </p>
          <div className="mt-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="exemple@gmail.com"
                className="input input-bordered w-full font-medium text-black"
              />
            </div>
            {messageAlert ? (
              <div className="mt-4">
                <p className="text-red-500 text-sm text-center font-medium">
                  {messageAlert}
                </p>
              </div>
            ) : null}
            <button className="mt-5 bg-primary w-full h-10 font-medium text-white rounded-lg hover:drop-shadow-md">
              {!isLoading ? (
                <span>Réinitialiser mot de passe</span>
              ) : (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#000"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={isLoading}
                />
              )}
            </button>

            <div className="flex justify-center mt-4">
              <Link to="/login" className="text-sm font-medium underline">
                Retour à la page de connection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
