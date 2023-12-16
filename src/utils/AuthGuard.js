import jwt_decode from "jwt-decode";
import isTokenExpire from "./TokenValidity";

export const isAuthenticated = () => {
  let tokenValid = false;

  try {
    if (localStorage.getItem("myra_access_api").replace(/[\""]+/g, "")) {
      if (
        jwt_decode(
          localStorage.getItem("myra_access_api").replace(/[\""]+/g, "")
        ).exp &&
        isTokenExpire(localStorage.getItem("myra_access_api"))
      ) {
        tokenValid = true;
      } else {
        tokenValid = false;
      }
    }
  } catch (error) {
    tokenValid = false;
  }
  return tokenValid;
};
