import React, { useState, useEffect } from "react";
import Axios from "axios"; 

const MyFavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const myFavorites = () => {
    const apiUrl = "http://127.0.0.1:8000/favourite_recipes/2"; // Replace with your actual API endpoint

    Axios.get(apiUrl)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    myFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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


