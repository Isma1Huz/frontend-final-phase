import { ColorRing } from "react-loader-spinner";

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

export {
  storeAuthUserOnLocalStorage,
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
  getSendingDataSpinner,
  getLoadingDataSpinner,
};
