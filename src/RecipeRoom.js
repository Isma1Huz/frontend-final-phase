import React from 'react'
import Header from './Components/Header';
import Filter from './Components/Filter';
import Footer from './Components/Footer';
import List from './Components/List';

function RecipeRoom() {
  return (
    <div>
      <Header />

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

      <Footer />




    </div>
  )
}

export default RecipeRoom
