import React, { useState, useEffect } from 'react';
import './List.css'; // Import your CSS file for the list

function List() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('https://example-data.draftbit.com/restaurants?_limit=10')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="restaurant-card">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="restaurant-image"
          />
          <div className="restaurant-details">
            <h3 className="restaurant-name">{restaurant.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;


  