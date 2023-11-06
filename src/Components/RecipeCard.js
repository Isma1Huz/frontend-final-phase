import React from "react";
import Rating from "react-rating";

function RecipeCard({ name, recipe_image, rating, time_in_minutes }) {
  return (
    <div className="recipe-card">
      <img className="recipe-photo" src={recipe_image} alt="recipe" />
      <p className="card-recipe-name">{name}</p>
      <div className="recipe-card__footer">
        <div className="recipe-time">
          <span>{`${time_in_minutes} minutes`}</span>
        </div>
        <div className="icon-number">
          <i className="fa fa-comments" aria-hidden="true"></i>
          <span>100</span>
        </div>
        <div className="icon-number">
          <i className="fa fa-heart" aria-hidden="true"></i>
          <span>80</span>
        </div>
        <div className="icon-number">
          <Rating
            initialRating={rating}
            emptySymbol="fa fa-star-o fa-x"
            fullSymbol="fa fa-star fa-x rate-color"
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
