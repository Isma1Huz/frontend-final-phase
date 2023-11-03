import React from 'react'
import Filter from '../../Components/Filter';
import List from '../../Components/List';
function LandingPage() {

  return (
    <div>

      <div className="image-container">
        <img src="image1.png" alt="image" className="image-container" />
        <div className="image-text">
          Delicious
          <br />
          Recipes
        </div>

      </div>

      <Filter />

      <List />





    </div>
  )
}

export default LandingPage
