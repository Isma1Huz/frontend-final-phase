import React from "react";
import "./LandinPage.css";
import Filter from "../../Components/Filter";
import List from "../../Components/List";
function LandingPage() {
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
      <section className="all-recipes">
        <div className="recipe-card">
          <img
            className="recipe-photo"
            src="https://www.kannammacooks.com/wp-content/uploads/2014/11/South-indian-style-chettinad-urlai-roast-potato-roast-recipe-1-3.jpg"
            alt="recipe"
          />
          <p>Egg White Bites</p>
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
              <i class="fa fa-heart" aria-hidden="true"></i>
              <span>80</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
