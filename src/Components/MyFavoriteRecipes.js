import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyFavoriteRecipes = () => {
  const authUser = useContext(AuthContext).authUser;
  const recipes = [
    { name: "Recipe 1", isFavorite: true },
    { name: "Recipe 2", isFavorite: false },
    { name: "Recipe 3", isFavorite: true },
    { name: "Recipe 4", isFavorite: false },
    { name: "Recipe 5", isFavorite: true },
    { name: "Recipe 6", isFavorite: false },
  ];
  const myFavorites = recipes.filter((recipe) => recipe.isFavorite);
  return (
    <div className="second-column">
      <h4>My Favorites</h4>
      <div>
        <ul>
          {myFavorites.map((recipe, index) => (
            <li key={index}>
              <p>{recipe.name}</p>
              <p id="view">
                <a>View</a>
              </p>
              <p id="remove">
                <a>Remove</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyFavoriteRecipes;
