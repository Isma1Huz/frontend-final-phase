import React, { useContext } from "react";
import EditRecipeModal from "./EditRecipeModal";
import { TrashFill } from "react-bootstrap-icons";
import { AuthContext } from "../contexts/AuthContext";

const MyRecipes = () => {
  const authUser = useContext(AuthContext).authUser;
  const recipes = [
    { name: "Recipe 1", isFavorite: true },
    { name: "Recipe 2", isFavorite: false },
    { name: "Recipe 3", isFavorite: true },
    { name: "Recipe 4", isFavorite: false },
    { name: "Recipe 5", isFavorite: true },
    { name: "Recipe 6", isFavorite: false },
  ];

  const myRecipes = recipes.filter((recipe) => !recipe.isFavorite);
  return (
    <div className="second-column">
      <h4>My Recipes</h4>
      <div>
        <ul className="recipelistmy">
          {myRecipes.map((recipe, index) => (
            <li key={index}>
              <p>{recipe.name}</p>
              <EditRecipeModal />
              <TrashFill color="#CB4040" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyRecipes;
