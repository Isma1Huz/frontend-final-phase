import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './EditProfile.css'
import profile from '../assets/profile.png';


function EditProfileModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a onClick={handleShow} id='editProfile'>
        Edit Profile
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalbody'>
          
            <div className='first-column'>
                <img src={profile} className='profiling' alt='Profile' />
                <h3>Ismael Hussein</h3>
                <p>Add Email</p>
            </div>
        </Modal.Body>
        <Modal.Footer className='modalfooter'>
          <Button variant="primary" onClick={handleClose} className='button'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfileModal;