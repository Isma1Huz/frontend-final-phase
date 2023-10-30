import React from 'react'

function Filter() {
  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <label htmlFor="ingredients">Ingredients:</label>
        <select id="ingredients" name="ingredients">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="ratings">Ratings:</label>
        <select id="ratings" name="ratings">
          <option value="rating1">Rating 1</option>
          <option value="rating2">Rating 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="country">Country:</label>
        <select id="country" name="country">
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="creationDate">Creation Date:</label>
        <select id="creationDate" name="creationDate">
          <option value="date1">Date 1</option>
          <option value="date2">Date 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      
    </div>
    );
}

export default Filter
