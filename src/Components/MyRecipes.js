import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditRecipeModal from "./EditRecipeModal";
import { TrashFill } from "react-bootstrap-icons";
import { AuthContext } from "../contexts/AuthContext";
import { MAIN_DOMAIN } from "../utils/constants";
import { alert_error, alert_success } from "../utils/toast_messages";
import {
  getHTTPHeaderWithToken,
  getLoggedInUserDetails,
} from "../utils/functions";
import './List.css';

const MyRecipes = () => {
  const navigate = useNavigate();
  const authUser = useContext(AuthContext).authUser;
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const id = getLoggedInUserDetails()?.id;
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(`${MAIN_DOMAIN}/recipes/user/${id}`, getHTTPHeaderWithToken());
        if (response.ok) {
          const data = await response.json();
          setMyRecipes(data); 
        } else {
          throw new Error("Error fetching user recipes.");
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
        alert_error("Error fetching user recipes. Please try again.");
      }
    };

    fetchUserRecipes();
  }, [authUser]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const token = getHTTPHeaderWithToken(); // Replace with your actual JWT token
      const headers = {
        Accept: "application/json",
        Authorization: token.headers.Authorization,
        "Content-Type": "application/json",
      };

      const response = await fetch(`${MAIN_DOMAIN}/recipes/${recipeId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setMyRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
        alert_success("Recipe deleted successfully!");
      } else {
        throw new Error("Error deleting recipe.");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert_error("Error deleting recipe. Please try again.");
    }
  };

  const viewRecipeDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };


  

  return (
    <div className="second-column">
      <h4>My Recipes</h4>
      <div>
        <ul className="recipelistmy">
          {myRecipes.map((recipe, index) => (
            <li key={index} className="myrecipeitem">
              <p className="myrecipename">{recipe.name}</p>
              <p id="view" onClick={() => viewRecipeDetails(recipe.id)}>
                View
              </p>
              <EditRecipeModal recipe={recipe} />
              <TrashFill
                color="#CB4040"
                onClick={() => handleDeleteRecipe(recipe.id)}
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyRecipes;
