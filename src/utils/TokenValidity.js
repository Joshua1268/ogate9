import jwt_decode from "jwt-decode";

export default function isTokenExpire(token) {
  try {
    const decodedToken = jwt_decode(token);
    const expirationDate = new Date(decodedToken.exp * 1000); // Convert expiration date from seconds to milliseconds
    const currentDate = new Date();

    return currentDate < expirationDate;
  } catch (error) {
    // Handle any errors (e.g., invalid token format)
    console.error("Error while decoding token:", error);
    return false;
  }
}
