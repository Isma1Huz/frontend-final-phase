import React from "react";
import Rating from "react-rating";

function RecipeCard() {
  return (
    <div className="recipe-card">
      <img
        className="recipe-photo"
        src="https://www.kannammacooks.com/wp-content/uploads/2014/11/South-indian-style-chettinad-urlai-roast-potato-roast-recipe-1-3.jpg"
        alt="recipe"
      />
      <p className="card-recipe-name">Egg White Bites</p>
      <div className="recipe-card__footer">
        <div className="recipe-time">
          <span>10 minutes</span>
        </div>
        <div className="icon-number">
          <i class="fa fa-comments" aria-hidden="true"></i>
          <span>100</span>
        </div>
        <div className="icon-number">
          <i class="fa fa-heart" aria-hidden="true"></i>
          <span>80</span>
        </div>
        <div className="icon-number">
          <Rating
            initialRating={2}
            emptySymbol="fa fa-star-o fa-x"
            fullSymbol="fa fa-star fa-x rate-color"
            onChange={(rate) => alert(rate)}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
