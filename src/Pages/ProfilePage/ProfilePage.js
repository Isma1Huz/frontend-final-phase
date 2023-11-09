import React, { useContext } from "react";
import "./ProfilePage.css";
import EditProfileModal from "../../Components/EditProfileModal"; // Import EditProfileModal
import CreateRecipeModal from "../../Components/CreateRecipeModal";

import { Link } from "react-router-dom";
import MyRecipes from "../../Components/MyRecipes";
import MyFavoriteRecipes from "../../Components/MyFavoriteRecipes";
import MyRecipesGroups from "../../Components/MyRecipesGroups";
import { AuthContext } from "../../contexts/AuthContext";
function ProfilePage() {
    const authUser = useContext(AuthContext).authUser;
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
        <MyRecipes />
        <MyFavoriteRecipes />
        <div className="fourth-column">
          <CreateRecipeModal />
          <Link to="/group">
            <button>Create a Group</button>
          </Link>
        </div>
      </div>
      <MyRecipesGroups />
    </div>
  );
}

export default ProfilePage;
