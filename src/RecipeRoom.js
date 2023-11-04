import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RecipePage from "./Pages/RecipePage/RecipePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Register from "./Pages/AuthenticationPages/SignupPage";
import Login from "./Pages/AuthenticationPages/LoginPage";
import GroupPage from "./Pages/GroupPage/GroupPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
  storeAuthUserOnLocalStorage,
} from "./utils/functions";
import { AuthContext } from "./contexts/AuthContext";

function RecipeRoom() {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  const decode_jwt = (token) => {
    const decoded = jwtDecode(token);
    return decoded.sub;
  };

  const loginFromLocalStorage = () => {
    const storedAuthUser = getAuthUserFromLocalStorage();
    if (storedAuthUser) {
      setAuthUser(decode_jwt(storedAuthUser));
    }
  };

  const logout = () => {
    removeAuthUserFromLocalStorage();
    setAuthUser(null);
  };

  const handleLogin = (access_token) => {
    storeAuthUserOnLocalStorage(access_token);
    setAuthUser(decode_jwt(access_token));
    navigate("/");
  };

  useEffect(() => {
    loginFromLocalStorage();
  }, []);
  return (
    <div>
      <AuthContext.Provider
        value={{ authUser: authUser, logout: logout, handleLogin: handleLogin }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/group" element={<GroupPage />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default RecipeRoom;
