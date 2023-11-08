import "./RecipePage.css";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import youtube from "../../assets/youtube.png";
import pintrest from "../../assets/pintrest.png";
import CreateComment from "../../Components/CreateComment";
import { RecipeContext } from "../../contexts/RecipeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MAIN_DOMAIN } from "../../utils/constants";
import {
  getHTTPHeaderWithToken,
  getLoadingDataSpinner,
  getLoggedInUserDetails,
} from "../../utils/functions";
import Rating from "react-rating";
import { alert_error } from "../../utils/toast_messages";

function RecipePage() {
  const recipeContext = useContext(RecipeContext);
  const authContext = useContext(AuthContext);
  const user_id = getLoggedInUserDetails()?.id;
  let { recipe_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [rate, setRating] = useState(0);

  const [recipeDetails, setRecipeDetails] = useState(null);

  const createListFromString = (s) => {
    if (s) {
      return s.split("\n");
    } else {
      return [recipe_id];
    }
  };

  const updateRecipeDetails = (new_rate) => {
    let avg_rate = rate;
    if (rate === 0) {
      if (recipeDetails.rate_count === 0) {
        avg_rate = new_rate;
      } else {
        avg_rate =
          (recipeDetails.rating * recipeDetails.rate_count + new_rate) /
          (recipeDetails.rate_count + 1);
      }
    } else {
      if (recipeDetails.rate_count === 0) {
        avg_rate = new_rate;
      } else {
        avg_rate =
          (recipeDetails.rating * recipeDetails.rate_count - rate + new_rate) /
          recipeDetails.rate_count;
      }
    }
    const new_recipe = { ...recipeDetails, rating: avg_rate };
    recipeContext.updateRecipe(new_recipe);
    setRating(avg_rate);
  };
  const ingredients = createListFromString(recipeDetails?.ingredients);
  const instructions = createListFromString(recipeDetails?.procedure);

  const fetchRecipeFromServer = () => {
    setIsLoading(true);
    axios
      .get(`${MAIN_DOMAIN}/recipes/${recipe_id}`, getHTTPHeaderWithToken())
      .then((resp) => {
        if (resp.status === 200) {
          setRecipeDetails(resp.data);
        }
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  const fetchUserRecipeRatingFromServer = () => {
    axios
      .get(
        `${MAIN_DOMAIN}/ratings/recipe/${recipe_id}/${user_id}`,
        getHTTPHeaderWithToken()
      )
      .then((resp) => {
        if (resp.status === 200) {
          setRating(resp.data.rating);
        } else {
          setRating(0);
        }
        setIsLoading(false);
      })
      .catch((err) => setRating(0));
  };

  const rateRecipe = (rate) => {
    const data = {
      user_id: authContext.authUser.id,
      recipe_id: parseInt(recipe_id),
      rating: rate,
    };
    axios
      .post(`${MAIN_DOMAIN}/ratings`, data, getHTTPHeaderWithToken())
      .then((resp) => {
        if (resp.status === 201) {
          updateRecipeDetails(resp.data.rating);
        }
      })
      .catch((err) => alert_error("Error occured while rating"));
  };

  const addRecipeComments = (comment) => {
    const new_recipe_details = {
      ...recipeDetails,
      comments: [comment, ...recipeDetails.comments],
    };
    setRecipeDetails(new_recipe_details);
    recipeContext.updateRecipe(new_recipe_details);
  };

  useEffect(() => {
    fetchRecipeFromServer();
    fetchUserRecipeRatingFromServer();
  }, []);

  return isLoading ? (
    <div className="spinner-loader">{getLoadingDataSpinner()}</div>
  ) : (
    <>
      {" "}
      <div className="banner">
        <h1>{recipeDetails?.name}</h1>
      </div>
      <div className="ingredients">
        <h2>Ingredients</h2>
        <ul style={{ listStyleType: "disc" }}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Steps</h2>
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <h5 className="rating">
          <b>Do you want to rate?</b>
        </h5>
        <ol className="rates">
          <Rating
            initialRating={rate}
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x rate-color"
            onChange={(rate) => rateRecipe(rate)}
          />
        </ol>

        <h5 className="rating">
          <b>Comments</b>
          <CreateComment
            recipe_id={recipe_id}
            addRecipeComments={addRecipeComments}
          />
        </h5>

        <ul style={{ listStyleType: "none" }}>
          {recipeDetails?.comments.map((comment) => (
            <li key={comment.id}>
              <div style={{ display: "flex" }}>
                <img
                  src={comment.user.profile_photo}
                  className="profile"
                  alt="Profile"
                />
                <div>
                  <h5>{`${comment.user.first_name} ${comment.user.last_name}`}</h5>
                  <p>{comment.created_at}</p>
                </div>
              </div>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
        <h5 className="rating">
          <b>Share Recipe</b>
        </h5>
        <div className="share">
          <a href="https://www.facebook.com/">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://twitter.com/">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="https://www.pinterest.com/">
            <img src={pintrest} alt="Pintrest" />
          </a>
          <a href="https://www.youtube.com/">
            <img src={youtube} alt="Youtube" />
          </a>
        </div>
      </div>
    </>
  );
}

export default RecipePage;
