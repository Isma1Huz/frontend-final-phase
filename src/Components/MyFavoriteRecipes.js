import React, { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { alert_error } from "../utils/toast_messages";
import { getHTTPHeaderWithToken } from "../utils/functions";
import { MAIN_DOMAIN } from "../utils/constants";
import axios from "axios";

const MyFavoriteRecipes = () => {
  const authUser = useContext(AuthContext).authUser;
  const recipeContext = useContext(RecipeContext);
  const navigate = useNavigate();
  const deleteRecipeAsMyFovoriteOnTheServer = (recipeId) => {
    const data = {
      recipe_id: recipeId,
      user_id: authUser?.id,
    };

    axios
      .post(
        `${MAIN_DOMAIN}/favourite_recipes/favourite`,
        data,
        getHTTPHeaderWithToken()
      )
      .then((resp) => {
        if (resp.status === 200) {
          recipeContext.removeFromFavoriteRecipes(recipeId);
        }
      })
      .catch((error) => {
        alert_error("Something went wrong. Try later!!");
      });
  };

  const myFavoriteList = recipeContext.myFavoriteRecipes.map(
    (recipe, index) => (
      <li key={index}>
        <p>{recipe.name}</p>
        <p id="view" onClick={() => viewRecipeDetails(recipe.id)}>
          View
        </p>
        <p
          id="remove"
          onClick={() => deleteRecipeAsMyFovoriteOnTheServer(recipe.id)}
        >
          Remove
        </p>
      </li>
    )
  );

  const viewRecipeDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
  return (
    <div className="second-column">
      <h4>My Favorites</h4>
      <div>
        <ul>{myFavoriteList}</ul>
      </div>
    </div>
  );
};

export default MyFavoriteRecipes;
