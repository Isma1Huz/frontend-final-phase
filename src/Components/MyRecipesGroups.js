import React from "react";
import { TrashFill } from "react-bootstrap-icons";
import EditRecipeModal from "./EditRecipeModal";

const MyRecipesGroups = () => {
  const groups = [
    { name: "Group 1", isFavorite: true },
    { name: "Group 2", isFavorite: false },
    { name: "Group 3", isFavorite: true },
  ];
  return (
    <div className="groupsbtn">
      <div className="second-column invite">
        <h4>My Groups</h4>
        <div className="groupsitem">
          <ul className="invitelist">
            {groups.map((recipe, index) => (
              <li key={index}>
                <p>{recipe.name}</p>
                <EditRecipeModal />
                <TrashFill color="#CB4040" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="second-column invite ">
        <h4>Invited Groups</h4>
        <div>
          <ul className="invitelist">
            {groups.map((recipe, index) => (
              <li key={index}>
                <p>{recipe.name}</p>
                <button className="edit">Join</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyRecipesGroups;
