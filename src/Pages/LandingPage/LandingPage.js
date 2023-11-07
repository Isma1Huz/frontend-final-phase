import React, { useContext, useState } from "react";

import "./LandinPage.css";
import RecipeCard from "../../Components/RecipeCard";
import { RecipeContext } from "../../contexts/RecipeContext";
import SearchRecipeInput from "../../Components/SearchRecipeInput";
import { getLoadingDataSpinner } from "../../utils/functions";
import RecipeFilter from "../../Components/RecipeFilter";
function LandingPage() {
  const [searchText, setSearchText] = useState("");
  const [recipeFilterDic, setRecipeFilterDic] = useState({
    ingredient: "all",
    country: "all",
    number_of_people_served: "",
    created_at: [],
    rating: "0",
  });

  const recipeContext = useContext(RecipeContext);
  const recipeFilteredWithSerchText = recipeContext.recipes.filter((recipe) => {
    const composed_string =
      `${recipe.name}${recipe.ingredients}${recipe.number_of_people_served}`.toLowerCase();
    if (searchText === "") {
      return true;
    } else {
      return composed_string.includes(searchText.toLowerCase());
    }
  });
  const filteredRecipes = recipeFilteredWithSerchText.filter((recipe) => {
    if (
      recipeFilterDic.ingredient === "all" &&
      recipeFilterDic.country === "all" &&
      recipeFilterDic.number_of_people_served === "" &&
      recipeFilterDic.created_at.length === 0 &&
      recipeFilterDic.rating === "0"
    ) {
      return true;
    } else {
      const recipeCreationDate = new Date(recipe.created_at);
      const startDate = new Date(recipeFilterDic.created_at[0]);
      const endDate = new Date(recipeFilterDic.created_at[1]);

      let isDateCorrect = false;
      if (startDate.toDateString() === endDate.toDateString()) {
        isDateCorrect =
          startDate.toDateString() === recipeCreationDate.toDateString();
      } else {
        isDateCorrect =
          recipeCreationDate > startDate && recipeCreationDate < endDate;
      }

      return (
        recipe.ingredients.toLowerCase().includes(recipeFilterDic.ingredient) ||
        recipe.country.toLowerCase() ===
          recipeFilterDic.country.toLowerCase() ||
        recipe.number_of_people_served ===
          parseInt(recipeFilterDic.number_of_people_served) ||
        recipe.rating === parseInt(recipeFilterDic.rating) ||
        isDateCorrect
      );
    }
  });

  const getFilteredRecipes = (recipes) => {
    const recipesFilteredBy = recipes.filter((recipe) => {});
  };
  const recipeCardList = filteredRecipes.map((recipe) => (
    <RecipeCard
      key={recipe.id}
      name={recipe.name}
      recipe_image={recipe.recipe_image}
      rating={recipe.rating}
      country={recipe.country}
      time_in_minutes={recipe.time_in_minutes}
    />
  ));

  const handleRecipeSearch = (search_text) => {
    setSearchText(search_text);
  };
  return (
    <div className="landing-page">
      <div className="landing-page-banner">
        <p className="banner-title">Delicious Recipes</p>
      </div>
      <div className="recipe-search">
        <SearchRecipeInput handleRecipeSearch={handleRecipeSearch} />
        <div className="search-recipe-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
      {/* Filter section  */}
      <RecipeFilter setRecipeFilterDic={setRecipeFilterDic} />
      <section className="all-recipes">
        {/* All recipe cards goes here */}
        {recipeContext.isLoading ? (
          <div className="spinner-loader">{getLoadingDataSpinner()}</div>
        ) : searchText && recipeCardList.length === 0 ? (
          <div className="no-data">No recipes found for your search text!</div>
        ) : recipeCardList.length === 0 ? (
          <div className="no-data">No data Found</div>
        ) : (
          recipeCardList
        )}
      </section>
    </div>
  );
}

export default LandingPage;
