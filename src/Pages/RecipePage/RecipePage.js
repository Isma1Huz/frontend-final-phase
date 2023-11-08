import "./RecipePage.css";
import star from "../../assets/star.png";
import profile from "../../assets/profile.png";
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
} from "../../utils/functions";

function RecipePage() {
  const recipeContext = useContext(RecipeContext);
  let { recipe_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [recipeDetails, setRecipeDetails] = useState(null);

  const createListFromString = (s) => {
    if (s) {
      return s.split("\n");
    } else {
      return [recipe_id];
    }
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
          <b>Rating</b>
        </h5>
        <ol className="rates">
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <CreateComment
            recipe_id={recipe_id}
            addRecipeComments={addRecipeComments}
          />
        </ol>
        <h5 className="rating">
          <b>Comments</b>
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
