import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './EditProfile.css'


function CreateRecipeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>Create a recipe</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Recipe Title"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Number of people served"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><small>NOTE : Please separate your ingredients lists  with  “ . ”  symbol </small></Form.Label>
              <Form.Control as="textarea" rows={3}  placeholder='Ingredients'/>

            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><small>NOTE : Please separate your steps lists  with  “ . ”  symbol </small></Form.Label>
              <Form.Control as="textarea" rows={3}  placeholder='Steps'/>
            </Form.Group>
          </Form>
          <Button  onClick={handleClose} className='button'>
            Upload Image
          </Button>
        </Modal.Body>
        <Modal.Footer className='modalfooter'>
          <Button  onClick={handleClose} className='button'>
            Add Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRecipeModal;