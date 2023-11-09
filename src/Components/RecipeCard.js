import React, { useContext } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { RecipeContext } from "../contexts/RecipeContext";
import axios from "axios";
import { getHTTPHeaderWithToken } from "../utils/functions";
import { alert_error } from "../utils/toast_messages";
import { MAIN_DOMAIN } from "../utils/constants";
import "./RecipeCard.css";
import upsvg from "../assets/upsvg.png";
import downsvg from "../assets/downsvg.png";


function RecipeCard({
  id,
  name,
  recipe_image,
  rating,
  time_in_minutes,
  favourites,
  comments,
}) {
  const authUser = useContext(AuthContext).authUser;
  const recipeContext = useContext(RecipeContext);
  const navigate = useNavigate();
  const viewRecipeDetails = () => {
    navigate(`/recipe/${id}`);
  };
  const isThisMyFavorite = recipeContext.myFavoriteRecipes.find((recipe) =>
    recipe.id === id ? true : false
  );

  const makeThisRecipeMyFovoriteOnTheServer = () => {
    const data = {
      recipe_id: id,
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
          if (isThisMyFavorite) {
            recipeContext.removeFromFavoriteRecipes(id);
          } else {
            recipeContext.addToFavoriteRecipes(id);
          }
        } else {
          alert_error("Something went wrong. Try later!!");
        }
      })
      .catch((error) => {
        alert_error("Something went wrong. Try later!!");
      });
  };
  return (
    <div className={`recipe-card ${authUser ? "recipe-card--pointer" : null}`}>
      <img src={upsvg} className="up-svg"/>
      <img src={downsvg} className="down-svg"/>
      <img
        className="recipe-photo"
        src={recipe_image}
        alt="recipe"
        onClick={authUser ? viewRecipeDetails : null}
      />
      <p className="card-recipe-name">{name}</p>
      <div className="recipe-card__footer">
        <div className="recipe-time">
          <span>{`${time_in_minutes} minutes`}</span>
        </div>
        <div className="icon-number">
          <i className="fa fa-comments" aria-hidden="true"></i>
          <span>{comments.length}</span>
        </div>
        <div className="icon-number">
          {isThisMyFavorite ? (
            <i
              className="fa fa-heart"
              aria-hidden="true"
              onClick={makeThisRecipeMyFovoriteOnTheServer}
            ></i>
          ) : (
            <i
              class="fa fa-heart-o"
              aria-hidden="true"
              onClick={makeThisRecipeMyFovoriteOnTheServer}
            ></i>
          )}
          <span>{favourites}</span>
        </div>
        <div className="icon-number">
          <Rating
            initialRating={rating}
            emptySymbol="fa fa-star-o fa-x"
            fullSymbol="fa fa-star fa-x rate-color"
            readonly
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
