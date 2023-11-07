import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
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
import { RecipeContext } from "./contexts/RecipeContext";
import axios from "axios";
import { MAIN_DOMAIN } from "./utils/constants";
import { Cloudinary } from "@cloudinary/url-gen";

function RecipeRoom() {
  const [authUser, setAuthUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const cld = new Cloudinary({ cloud: { cloudName: "dshvbnvq0" } });

  const fetchAllRecipesFromServer = () => {
    setIsLoading(true);
    axios
      .get(`${MAIN_DOMAIN}/recipes`)
      .then((resp) => {
        if (resp.status === 200) {
          setRecipes(resp.data);
        }
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

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
    navigate("/login");
  };

  const handleLogin = (access_token) => {
    storeAuthUserOnLocalStorage(access_token);
    setAuthUser(decode_jwt(access_token));
    navigate("/");
  };

  const addRecipe = (recipe) => {
    const new_recipes = [recipe, ...recipes];
    setRecipes(new_recipes);
  };

  const deleteRecipe = (recipeId) => {
    const new_recipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(new_recipes);
  };

  const updateRecipe = (updatedRecipe) => {
    const new_recipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(new_recipes);
  };

  useEffect(() => {
    loginFromLocalStorage();
    fetchAllRecipesFromServer();
  }, []);
  return (
    <div>
      <AuthContext.Provider
        value={{ authUser: authUser, logout: logout, handleLogin: handleLogin }}
      >
        <Header />
        <RecipeContext.Provider
          value={{
            recipes: recipes,
            isLoading: isLoading,
            addRecipe: addRecipe,
            updateRecipe: updateRecipe,
            deleteRecipe: deleteRecipe,
          }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/group" element={<GroupPage />} />
          </Routes>
        </RecipeContext.Provider>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default RecipeRoom;
