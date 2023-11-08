import React, { useContext, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { RecipeContext } from "../contexts/RecipeContext";

const RecipeFilter = ({ setRecipeFilterDic }) => {
  const recipeContext = useContext(RecipeContext);
  const [selectionOptions, setSelectionOptions] = useState({
    ingredients: [],
    countries: [],
  });
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setRecipeFilterDic((current) => ({ ...current, [name]: value }));
  };

  const datePickerClass = showDatePopUp
    ? "filter-date-pop-up filter-date-pop-up--show"
    : "filter-date-pop-up";

  const formatedFieldDate = (date) => format(date, "yyyy-MM-dd");

  const generateFilterSelectionOptions = () => {
    const countries = new Set();
    const ingredients = new Set();
    recipeContext.recipes.forEach((el) => {
      countries.add(el.country.toLowerCase());
      el.ingredients
        .toLowerCase()
        .split("\n")
        .forEach((el) => {
          ingredients.add(el);
        });
    });

    setSelectionOptions({
      ingredients: Array.from(ingredients),
      countries: Array.from(countries),
    });
  };

  useEffect(() => {
    generateFilterSelectionOptions();
  }, [recipeContext.recipes]);

  return (
    <section className="recipe-filter">
      {/* <div className="recipe-filter-ingridients">
        <h6>Ingredients</h6>
        <select
          className="recipe-select"
          onChange={handleFilterChange}
          name="ingredient"
        >
          <option value="all">all</option>
          {selectionOptions.ingredients.map((ingredient, index) => (
            <option key={index} value={ingredient}>
              {ingredient}
            </option>
          ))}
        </select>
      </div> */}
      <div className="recipe-filter-country">
        <h6>Country</h6>
        <select
          className="recipe-select"
          name="country"
          onChange={handleFilterChange}
        >
          <option value="all">all</option>
          {selectionOptions.countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="recipe-filter-ingridients">
        <h6>No. of people served</h6>
        <input
          type="number"
          name="number_of_people_served"
          onChange={handleFilterChange}
        />
      </div>
      <div className="recipe-filter-date">
        <div className="date-title">
          Creation Date{" "}
          <b>{`${formatedFieldDate(
            range[0]["startDate"]
          ).toString()} to ${formatedFieldDate(
            range[0]["endDate"]
          ).toString()}`}</b>{" "}
          <i
            className="fa fa-calendar fa-1x"
            aria-hidden="true"
            onClick={toggleShowDatePicker}
          ></i>
          <i className="fa fa-repeat" aria-hidden="true"></i>
        </div>
        <div className={datePickerClass}>
          <DateRangePicker
            onChange={(item) => {
              setRange([item.selection]);
              setRecipeFilterDic((current) => ({
                ...current,
                created_at: [
                  formatedFieldDate(item.selection.startDate),
                  formatedFieldDate(item.selection.endDate),
                ],
              }));
            }}
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
        <select
          className="recipe-select"
          name="rating"
          onChange={handleFilterChange}
        >
          <option value="0">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </section>
  );
};

export default RecipeFilter;
