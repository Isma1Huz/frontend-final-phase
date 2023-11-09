import React, { useContext, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import profile from "../../assets/profile.png";
import "./ProfilePage.css";
import EditProfileModal from "../../Components/EditProfileModal"; // Import EditProfileModal
import CreateRecipeModal from "../../Components/CreateRecipeModal";
import { ArrowRight, TrashFill } from "react-bootstrap-icons";

import EditRecipeModal from "../../Components/EditRecipeModal";
import { Link } from "react-router-dom";
import MyRecipes from "../../Components/MyRecipes";
import MyFavoriteRecipes from "../../Components/MyFavoriteRecipes";
import MyRecipesGroups from "../../Components/MyRecipesGroups";
import { AuthContext } from "../../contexts/AuthContext";
function ProfilePage() {
  
  const [isModalOpen, setModalOpen] = useState(false); // State variable to control the modal

  const recipes = [
    { name: "Recipe 1", isFavorite: true },
    { name: "Recipe 2", isFavorite: false },
    { name: "Recipe 3", isFavorite: true },
    { name: "Recipe 4", isFavorite: false },
    { name: "Recipe 5", isFavorite: true },
    { name: "Recipe 6", isFavorite: false },
  ];  
  const authUser = useContext(AuthContext).authUser;

  const groups = [
    { name: "Group 1", isFavorite: true },
    { name: "Group 2", isFavorite: false },
    { name: "Group 3", isFavorite: true },
  ];

  const myRecipes = recipes.filter((recipe) => !recipe.isFavorite);
  const myFavorites = recipes.filter((recipe) => recipe.isFavorite);
  const firstName = authUser ? authUser.first_name : "";
  const lastName = authUser ? authUser.last_name : "";

  return (
    <div>
      <div className="profileContainer">
      <div className="first-column">
        {authUser ? (
          <img src={authUser?.profile_photo} alt="user profile" className='profiling' />
        ) : null}
          <h3 className="username-profile">{`${firstName} ${lastName}`}</h3>
          <p>
            <EditProfileModal />
          </p>
        </div>
        {/* My recipes */}
        <MyRecipes />
        {/* My favourite recipes */}
        <MyFavoriteRecipes />
        <div className="fourth-column">
          <CreateRecipeModal />
          <Link to="/group">
            <button>Create a Group</button>
          </Link>
        </div>
      </div>
      {/* my groups */}
      <MyRecipesGroups />
    </div>
  );
}

export default ProfilePage;
