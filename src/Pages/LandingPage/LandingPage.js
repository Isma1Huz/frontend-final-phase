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
    </div>
  );
}

export default LandingPage;
