import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { MAIN_DOMAIN } from "../utils/constants";

import { alert_error, alert_success } from '../utils/toast_messages';
import {
  getHTTPHeaderWithToken,
} from "../utils/functions";


function EditRecipeModal({ recipe, mainDomain, onUpdateRecipe }) {
  const [uploadingToCloudinary, setUploadingToCloudinary] = useState(false);
  const [recipeData, setRecipeData] = useState({
    name: recipe?.name || '',
    recipe_image: recipe?.recipe_image || '',
    ingredients: recipe?.ingredients || '',
    procedure: recipe?.procedure || '',
    number_of_people_served: recipe?.number_of_people_served || '',
    time_in_minutes: recipe?.time_in_minutes || '',
    country: recipe?.country || '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const storeProfileImageOnCloudinary = async (file) => {
    setUploadingToCloudinary(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'oyvighc5');
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzv8hj78f/image/upload',
        formData
      );
      setRecipeData({ ...recipeData, recipe_image: response.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert_error('Failed to upload image. Try again later');
    } finally {
      setUploadingToCloudinary(false);
    }
  };

  const handleSaveChanges = () => {
    const id = recipe?.id;
    const token = getHTTPHeaderWithToken(); 
    const updatedData = recipeData


    const headers = {
      Accept: "application/json",
      Authorization: token.headers.Authorization,
      "Content-Type": "application/json",
    };

    fetch(`${MAIN_DOMAIN}/recipes/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          alert_success("Recipe updated successfully!");
          handleClose();
        } else {
          throw new Error(data.detail || "Error updating recipe.");
        }
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
        alert_error("Error updating recipe. Please try again.");
      });
  };


  return (
    <>
      <button onClick={handleShow} className='edit'>
        Edit
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formRecipeTitle'>
              <Form.Control
                type='text'
                placeholder='Recipe Title'
                autoFocus
                value={recipeData.name}
                onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formNumberOfPeopleServed'>
              <Form.Control
                type='text'
                placeholder='Number of people served'
                value={recipeData.number_of_people_served}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, number_of_people_served: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formIngredients'>
              <Form.Label>
                <small>NOTE: Please separate your ingredients lists with “.” symbol</small>
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Ingredients'
                value={recipeData.ingredients}
                onChange={(e) => setRecipeData({ ...recipeData, ingredients: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formProcedure'>
              <Form.Label>
                <small>NOTE: Please separate your steps lists with “.” symbol</small>
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Steps'
                value={recipeData.procedure}
                onChange={(e) => setRecipeData({ ...recipeData, procedure: e.target.value })}
              />
            </Form.Group>
          </Form>
          {uploadingToCloudinary ? (
            <div className='spinner-loader'>Uploading...</div>
          ) : null}
          <input
            type='file'
            accept='image/png, image/jpeg'
            className='uploadbtn'
            onChange={(e) => storeProfileImageOnCloudinary(e.target.files[0])}
          />
        </Modal.Body>
        <Modal.Footer className='modalfooter'>
          <Button onClick={handleSaveChanges} className='button'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditRecipeModal;
