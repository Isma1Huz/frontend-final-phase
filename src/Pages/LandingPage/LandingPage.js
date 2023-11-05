import React, { useContext, useState } from "react";
import { addDays } from "date-fns";
import "./LandinPage.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import Filter from "../../Components/Filter";
import List from "../../Components/List";
import RecipeCard from "../../Components/RecipeCard";
import { DateRangePicker } from "react-date-range";
import { RecipeContext } from "../../contexts/RecipeContext";
import SearchRecipeInput from "../../Components/SearchRecipeInput";
import { getLoadingDataSpinner } from "../../utils/functions";
function LandingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePopUp, setShowDatePopUp] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
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
  const recipeCardList = recipeFilteredWithSerchText.map((recipe) => (
    <RecipeCard
      key={recipe.id}
      name={recipe.name}
      recipe_image={recipe.recipe_image}
      rating={recipe.rating}
      country={recipe.country}
      time_in_minutes={recipe.time_in_minutes}
    />
  ));
  const toggleShowDatePicker = () => {
    setShowDatePopUp(!showDatePopUp);
  };

  const datePickerClass = showDatePopUp
    ? "filter-date-pop-up filter-date-pop-up--show"
    : "filter-date-pop-up";
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
      <section className="recipe-filter">
        <div className="recipe-filter-ingridients">
          <h6>Ingredients</h6>
          <select className="recipe-select">
            <option value="all">all</option>
            <option value="ugali">ugali</option>
            <option value="ugali">ugali</option>
            <option value="ugali">ugali</option>
          </select>
        </div>
        <div className="recipe-filter-country">
          <h6>Country</h6>
          <select className="recipe-select">
            <option value="all">all</option>
            <option value="kenya">Kenya</option>
            <option value="uganda">Uganda</option>
            <option value="rwanda">Rwanda</option>
          </select>
        </div>
        <div className="recipe-filter-date">
          <div className="date-title">
            Creation Date <b>---to---</b>{" "}
            <i
              className="fa fa-calendar fa-1x"
              aria-hidden="true"
              onClick={toggleShowDatePicker}
            ></i>
            <i className="fa fa-repeat" aria-hidden="true"></i>
          </div>
          <div className={datePickerClass}>
            <DateRangePicker
              onChange={(item) => setRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={range}
              direction="horizontal"
            />
          </div>
        </div>
        <div className="recipe-filter-rating">
          <h6>Ratings</h6>
          <select className="recipe-select">
            <option value="all">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </section>
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
