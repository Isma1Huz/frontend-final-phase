import React from "react";

const SearchRecipeInput = ({ handleRecipeSearch }) => {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search Recipe..."
      onChange={(e) => handleRecipeSearch(e.target.value)}
    />
  );
};

export default SearchRecipeInput;
