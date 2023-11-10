import { ColorRing } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode";

const AUTH_USER = "authUser";

const storeAuthUserOnLocalStorage = (authUser) => {
  localStorage.setItem(AUTH_USER, JSON.stringify(authUser));
};

const getAuthUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(AUTH_USER));
};

const removeAuthUserFromLocalStorage = () => {
  return localStorage.removeItem(AUTH_USER);
};

const getHTTPHeaderWithToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAuthUserFromLocalStorage()}`,
    },
  };
};

const checkJwtTokenIsExpired = () => {
  const token = getAuthUserFromLocalStorage();
  const decodedToken = jwtDecode(token);
  const currentDate = new Date();
  // JWT exp is in seconds
  return decodedToken.exp * 1000 < currentDate.getTime();
};

const getSendingDataSpinner = () => {
  return (
    <ColorRing
      visible={true}
      height="50"
      width="50"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );
};

const getLoadingDataSpinner = () => {
  return (
    <ColorRing
      visible={true}
      height="50"
      width="50"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );
};

const getLoggedInUserDetails = () => {
  const token = getAuthUserFromLocalStorage();
  if (token) {
    const decoded = jwtDecode(getAuthUserFromLocalStorage());
    return decoded.sub;
  }
};

export {
  storeAuthUserOnLocalStorage,
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
  getSendingDataSpinner,
  getLoadingDataSpinner,
  getHTTPHeaderWithToken,
  getLoggedInUserDetails,
  checkJwtTokenIsExpired,
};
