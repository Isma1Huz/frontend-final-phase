import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './EditProfile.css'


function CreateComment() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>Add Comment</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>             
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><small>Create a Comment.</small></Form.Label>
              <Form.Control as="textarea" rows={7}  placeholder='Comment'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modalfooter'>
          <Button  onClick={handleClose} className='button'>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateComment;