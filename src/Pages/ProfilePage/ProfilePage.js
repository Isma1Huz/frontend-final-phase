import React, {useState} from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import profile from '../../assets/profile.png';
import './ProfilePage.css'
import EditProfileModal from '../../Components/EditProfileModal'; // Import EditProfileModal
import CreateRecipeModal from '../../Components/CreateRecipeModal';
import { ArrowRight } from 'react-bootstrap-icons'

import EditRecipeModal from '../../Components/EditRecipeModal';
function ProfilePage() {
    const [isModalOpen, setModalOpen] = useState(false); // State variable to control the modal

    const recipes = [
        { name: "Recipe 1", isFavorite: true },
        { name: "Recipe 2", isFavorite: false },
        { name: "Recipe 3", isFavorite: true },
        { name: "Recipe 4", isFavorite: false },
        { name: "Recipe 5", isFavorite: true },
        { name: "Recipe 6", isFavorite: false },];
    const groups = [
        { name: "Group 1", isFavorite: true },
        { name: "Group 2", isFavorite: false },
        { name: "Group 3", isFavorite: true },
    ];
    
    const myRecipes = recipes.filter(recipe => !recipe.isFavorite);
    const myFavorites = recipes.filter(recipe => recipe.isFavorite);

  return (
    <div>
        <Header/>
        <div className='profileContainer'>
            <div className='first-column'>
                <img src={profile} className='profiling' alt='Profile' />
                <h3>Ismael Hussein</h3>
                <p>
                    <EditProfileModal/> 
                </p>
            </div>
            <div className="second-column">
                <h4>My Recipes</h4>
                <div>
                <ul>
                    {myRecipes.map((recipe, index) => (
                    <li key={index}>
                        <p>{recipe.name}</p>
                        <EditRecipeModal/>
                        <ArrowRight/>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            <div className="second-column">
                <h4>My Favorites</h4>
                <div>
                <ul>
                    {myFavorites.map((recipe, index) => (
                    <li key={index}>
                        <p>{recipe.name}</p>
                        <p id='view'><a>View</a></p>
                        <p id='remove'><a >Remove</a></p>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            <div className='fourth-column'>
                <CreateRecipeModal/>
                <button>Create a Group</button>
            </div>

        </div>
        <div className='groups'>
        <div className="second-column">
                <h4>My Groups</h4>
                <div>
                <ul>
                    {groups.map((recipe, index) => (
                    <li key={index}>
                        <p>{recipe.name}</p>
                        <EditRecipeModal/>
                        <ArrowRight/>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            <div className="second-column">
                <h4>Invited Groups</h4>
                <div>
                <ul>
                    {groups.map((recipe, index) => (
                    <li key={index}>
                        <p>{recipe.name}</p>
                        <button className='edit'>Join</button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
      


        <Footer/>
        

      
    </div>
  )
}

export default ProfilePage


