import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { loginAdmin } from "../../services/authentification/AuthRequest";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    const data = {
      numero: "",
      password: password,
      username: username,
    };

    try {
      loginAdmin(data)
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem("myra_access_api", res.data.accessToken);
          navigate("/dashboard");
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            setMessageAlert(err.response.data.donnee);
          } else {
            setMessageAlert("Une erreur s'est produite, rééssayez!");
          }
          console.log("api error", err);
        });
    } catch (error) {
      setIsLoading(false);
      setMessageAlert("Quelque chose s'est mal passé, rééssayer");
      console.log("catch error", error);
    }
  };

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
      <h1 className="text-4xl font-Montserrat text-white font-black" >O'GATE</h1>
    </div>
    <div className="w-1/2 h-full bg-zinc-50">
      <div className="w-80 lg:w-96 mx-auto h-fit rounded-lg">
        <h1 className="text- text-2xl lg:text-3xl text-black font-bold mt-2">
          Connexion
        </h1>
        <p className="mt-3 text-zinc-500">
          Connectez-vous pour accéder à votre espace d'administration
        </p>
        <div className="mt-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="exemple@gmail.com"
              className="input input-bordered w-full font-medium text-black"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full font-medium text-black"
            />
            <div className="flex justify-end mt-2">
              <Link
                to="/forget-password"
                className="text-sm font-medium underline"
              >
                Mot de passe oublié
              </Link>
            </div>
          </div>
          {messageAlert ? (
            <div className="mt-4">
              <p className="text-red-500 text-sm text-center font-medium">
                {messageAlert}
              </p>
            </div>
          ) : null}
          <button
            onClick={handleSubmit}
            className="mt-5 bg-primary flex items-center justify-center w-full h-10 font-medium text-white rounded-lg hover:drop-shadow-md"
          >
            {!isLoading ? (
              <span>Se connecter</span>
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
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
