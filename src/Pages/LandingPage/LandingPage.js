import React, { useState } from "react";
import { addDays } from "date-fns";
import "./LandinPage.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import Filter from "../../Components/Filter";
import List from "../../Components/List";
import RecipeCard from "../../Components/RecipeCard";
import { DateRangePicker } from "react-date-range";
function LandingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePopUp, setShowDatePopUp] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const toggleShowDatePicker = () => {
    setShowDatePopUp(!showDatePopUp);
  };

  const datePickerClass = showDatePopUp
    ? "filter-date-pop-up filter-date-pop-up--show"
    : "filter-date-pop-up";

  return (
    <div className="landing-page">
      <div className="landing-page-banner">
        <p className="banner-title">Delicious Recipes</p>
      </div>
      <div className="recipe-search">
        <input
          className="search-input"
          type="text"
          placeholder="Search Recipe..."
        />
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
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>
    </div>
  );
}

export default LandingPage;
