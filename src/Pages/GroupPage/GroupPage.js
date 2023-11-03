
import React, { useState } from 'react';
import './group.css';

const GroupPage = () => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [peopleServed, setPeopleServed] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreateRecipe = (e) => {
    e.preventDefault();
    alert(`
      Recipe Title: ${recipeTitle}
      No. of People Served: ${peopleServed}
      Estimated Time: ${estimatedTime}
      File Name: ${selectedFile ? selectedFile.name : "No file selected"}
    `);
  };

  return (
    <div className='form-G'>
      <div className='containerg'>
        <h2 className='group'>Create a Group Recipe</h2>
        <form onSubmit={handleCreateRecipe}>
            <input className='grouprecipe-input'
              type="text"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
              placeholder="Recipe Title"
              required
            />
            <input className='grouprecipe-input'
              type="number"
              value={peopleServed}
              onChange={(e) => setPeopleServed(e.target.value)}
              placeholder="No. of People Served"
              required
            />
            <input className='grouprecipe-input'
              type="text"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="Estimated Time"
              required
            />
          <div className="upload-btn-wrapper">
            <button className='group-button1'  onClick={() => document.getElementById('fileInput').click()}>Upload Photo</button>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setSelectedFile(e.target.files[0])} accept="image/*" />
          </div>
          <button className='group-button' type="submit">Create a Group Recipe</button>
        </form>
      </div>  
    </div>
  );
};

export default GroupPage;
