import React, { useState } from 'react';
import './GroupContribute.css';

function GroupContribute() {
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [stepsList, setStepsList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMembersList, setSelectedMembersList] = useState([]);

  const initialData = {
    title: 'Ugali',
    peopleServed: 5,
    estimatedTime: 30,
  };

  const handleAddIngredients = (e) => {
    e.preventDefault();
    if (ingredientsInput) {
      setIngredientsList([...ingredientsList, ingredientsInput]);
      setIngredientsInput('');
    }
  };

  const handleAddSteps = (e) => {
    e.preventDefault();
    if (stepsInput) {
      setStepsList([...stepsList, stepsInput]);
      setStepsInput('');
    }
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    if (member) {
      setSelectedMembersList([...selectedMembersList, member]);
    }
  };

  return (
    <div className='contribute'>
      <div className='left'>
        <div className='group-contribute-header'>
          <h1>Recipe: {initialData.title}</h1>
          <h5> Number of People served: {initialData.peopleServed}</h5>
          <h5> Estimated Time: {initialData.estimatedTime}</h5>
          <button className='save'>Save</button>
        </div>

        <div className='group-ingredients'>
        <label><h3>Ingredients</h3></label>
        <form onSubmit={handleAddIngredients}>
          <input
            type="text"
            value={ingredientsInput}
            placeholder='Ingredients'
            onChange={(e) => setIngredientsInput(e.target.value)}
          />
          <button type="submit" className='save'>Add</button>
        </form>
        </div>
        <ul>
          {ingredientsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className='group-ingredients'>
          <label><h3>Steps</h3></label>
          <form onSubmit={handleAddSteps}>
            <input
              type="text"
              value={stepsInput}
              placeholder='Steps'
              onChange={(e) => setStepsInput(e.target.value)}
            />
            <button type="submit" className='save'>Add</button>
          </form>
        </div>
        <ul>
          {stepsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>
  
  
      <div className='members'>
        <select onChange={(e) => handleSelectMember(e.target.value)} className='selectmembers'>
          <option value="">Select a Member</option>
          <option value="Member 1">Member 1</option>
          <option value="Member 2">Member 2</option>
          <option value="Member 2">Member 3</option>
          <option value="Member 2">Member 4</option>
          <option value="Member 2">Member 5</option>
          <option value="Member 2">Member 6</option>
          <option value="Member 2">Member 7</option>


        </select>
        {selectedMembersList.length > 0 && (
          <div>
            <h3>Group Members</h3>
            <ul>
              {selectedMembersList.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupContribute;

