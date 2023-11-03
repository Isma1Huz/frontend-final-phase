import React from 'react';
import './List.css';


import foodImage1 from '../assets/food1.jpg';
import foodImage2 from '../assets/food2.jpg';
import foodImage3 from '../assets/food3.jpg';
import foodImage4 from '../assets/food4.jpg';
import foodImage5 from '../assets/food5.jpg';
import foodImage6 from '../assets/food6.jpg';

function List() {
  const foodItems = [
    {
      id: 1,
      name: 'Food Item 1',
      preparationTime: 30,
      image: foodImage1,
    },
    {
      id: 2,
      name: 'Food Item 2',
      preparationTime: 45,
      image: foodImage2,
    },
    {
      id: 3,
      name: 'Food Item 3',
      preparationTime: 60,
      image: foodImage3,
    },
    {
      id: 4,
      name: 'Food Item 4',
      preparationTime: 25,
      image: foodImage4,
    },
    {
      id: 5,
      name: 'Food Item 5',
      preparationTime: 40,
      image: foodImage5,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    },
    {
      id: 6,
      name: 'Food Item 6',
      preparationTime: 50,
      image: foodImage6,
    }
  ];

  return (
    <div className="food-list">
      {foodItems.map((foodItem) => (
        <div className="food-card" key={foodItem.id}>
          <img src={foodItem.image} alt={foodItem.name} />
          <h3>{foodItem.name}</h3>
          <p>Preparation Time: {foodItem.preparationTime} minutes</p>
        </div>
      ))}
    </div>
  );
}

export default List;




  