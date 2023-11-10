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
import GroupContribute from "./Pages/GroupPage/GroupContribute";
import {
  checkJwtTokenIsExpired,
  getAuthUserFromLocalStorage,
  getHTTPHeaderWithToken,
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
  const [myFavoriteRecipes, setMyFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const cld = new Cloudinary({ cloud: { cloudName: "dshvbnvq0" } });

  const fetchAllRecipesFromServer = () => {
    setIsLoading(true);
    axios
      .get(`${MAIN_DOMAIN}/recipes`, { "Access-Control-Allow-Origin": "*" })
      .then((resp) => {
        if (resp.status === 200) {
          setRecipes(resp.data);
        }
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  const fetchAllMyFavoriteRecipesFromServer = () => {
    setIsLoading(true);
    axios
      .get(
        `${MAIN_DOMAIN}/favourite_recipes/${authUser?.id}`,
        getHTTPHeaderWithToken()
      )
      .then((resp) => {
        if (resp.status === 200) {
          setMyFavoriteRecipes(resp.data);
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
      const isTokenExpired = checkJwtTokenIsExpired();
      if (isTokenExpired) {
        setAuthUser(null);
      } else {
        setAuthUser(decode_jwt(storedAuthUser));
      }
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

  const removeFromFavoriteRecipes = (recipeId) => {
    const new_favorite_recipes = myFavoriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    const new_recipes = recipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, favourites: recipe.favourites - 1 }
        : recipe
    );
    setMyFavoriteRecipes(new_favorite_recipes);
    setRecipes(new_recipes);
  };

  const addToFavoriteRecipes = (recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    const new_recipes = recipes.map((recipe) =>
      recipe.id === recipeId
        ? { ...recipe, favourites: recipe.favourites + 1 }
        : recipe
    );
    const new_favorite_recipes = [...myFavoriteRecipes, recipe];
    setMyFavoriteRecipes(new_favorite_recipes);
    setRecipes(new_recipes);
  };

  useEffect(() => {
    loginFromLocalStorage();
    fetchAllRecipesFromServer();
  }, []);

  useEffect(() => {
    if (authUser) {
      fetchAllMyFavoriteRecipesFromServer();
    }
  }, [authUser]);
  return (
    <div>
      <AuthContext.Provider
        value={{ authUser: authUser, logout: logout, handleLogin: handleLogin }}
      >
        <Header />
        <RecipeContext.Provider
          value={{
            recipes: recipes,
            myFavoriteRecipes: myFavoriteRecipes,
            isLoading: isLoading,
            addRecipe: addRecipe,
            updateRecipe: updateRecipe,
            deleteRecipe: deleteRecipe,
            removeFromFavoriteRecipes: removeFromFavoriteRecipes,
            addToFavoriteRecipes: addToFavoriteRecipes,
          }}
        >
          <Routes>
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route exact path="/recipe/:recipe_id" element={<RecipePage />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/group" element={<GroupPage />} />
            <Route
              exact
              path="/group/contribute"
              element={<GroupContribute />}
            />
          </Routes>
          <Outlet />
        </RecipeContext.Provider>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default RecipeRoom;
