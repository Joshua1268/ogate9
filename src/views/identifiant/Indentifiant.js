import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import { ThreeDots } from "react-loader-spinner";
import BaseLayout from "../../layout/BaseLayout";
import { CheckCircle2Icon } from "lucide-react";
import { changerMotDePasse } from "../../services/utilisateurs/UtilisateursRequest";

const Indentifiant = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarSuccessOpen, setSnackbarOpenSuccess] = useState(false);
  const [snackbarErrorOpen, setSnackbarOpenError] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal } = snackbarPosition;

  const handleCloseSnackbarSuccess = () => {
    setSnackbarOpenSuccess(false);
  };

  const handleCloseSnackbarError = () => {
    setSnackbarOpenError(false);
  };

  const ChangeIdentifiant = () => {
    setLoading(true);
    const data = {
      newPassword: newPassword,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    changerMotDePasse(data)
      .then((res) => {
        setLoading(false);
        if (res.status === true) {
          setSuccessMessage("Vous avez bien modifié votre mot de passe");
          setSnackbarOpenSuccess(true);
        } else {
          setErrorMessage(res.message);
          setSnackbarOpenError(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Erreur lors de la modification du mot de passe");
        setSnackbarOpenError(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("myra_access_api");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);

  return (
    <BaseLayout>
      <div className="w-full px-5 py-8">
        <h1 className="text-3xl text-black font-bold">
          Mis à jour des identifiants
        </h1>
        <div className="w-full mt-7">
          <div className="w-96 h-96 bg-gra-200">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                disabled={true}
                value={userInfo !== null ? userInfo.username : ""}
                type="text"
                placeholder="mtn"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Ancien mot de passe</span>
              </label>
              <input
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="mtn"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nouveau mot de passe</span>
              </label>
              <input
                disabled={loading}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                placeholder="mtn"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirmer mot de passe</span>
              </label>
              <input
                disabled={loading}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="text"
                placeholder="mtn"
                className="input input-bordered w-full"
              />
            </div>
            {!loading ? (
              <button
                disabled={loading}
                className="bg-primary w-full h-11 rounded-lg mt-5 text-white flex items-center justify-center gap-x-2"
                onClick={ChangeIdentifiant}
              >
                <CheckCircle2Icon />
                <span className="font-medium">Modifier</span>
              </button>
            ) : (
              <button
                disabled={loading}
                className="bg-mtn w-full h-11 rounded-lg mt-5 flex items-center justify-center"
              >
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#000"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={loading}
                />
              </button>
            )}
          </div>
        </div>
      </div>

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

export default Indentifiant;
