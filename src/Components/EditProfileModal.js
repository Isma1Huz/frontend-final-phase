// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import './EditProfile.css';
// import profile from '../assets/profile.png';
// const cloudinary = require('cloudinary').v2;

// function EditProfileModal() {
//   const [show, setShow] = useState(false);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     fetch('YOUR_API_ENDPOINT')
//       .then(response => response.json())
//       .then(data => {
//         setUserData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const updateUserProfile = (updatedUserData) => {
//     fetch('YOUR_API_ENDPOINT', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUserData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('User data updated successfully:', data);
//         handleClose();
//       })
//       .catch(error => {
//         console.error('Error updating user data:', error);
//       });
//   };

//   const handleProfilePictureChange = async (event) => {
//     const file = event.target.files[0];

//     try {
//       const uploadResponse = await cloudinary.uploader.upload(file.path, {
//         upload_preset: 'YOUR_UPLOAD_PRESET',
//       });

//       const imageUrl = uploadResponse.secure_url;
//       const updatedUserData = {
//         ...userData,
//         profilePicture: imageUrl,
//       };
//       updateUserProfile(updatedUserData);
//     } catch (error) {
//       console.error('Error uploading image to Cloudinary:', error);
//     }
//   };

//   return (
//     <>
//       <a onClick={handleShow} id='editProfile'>
//         Edit Profile
//       </a>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Profile Information</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className='modalbody'>
//           <div className='first-column'>
//             <img src={userData?.profilePicture || profile} className='profiling' alt='Profile' />
//             <h3>{userData?.name || 'User Name'}</h3>
//             <Form.Group controlId='formFile' className='mb-3'>
//               <Form.Label>Change Profile Picture</Form.Label>
//               <Form.Control type='file' onChange={handleProfilePictureChange} />
//             </Form.Group>
//             <p>{userData?.email || 'Add Email'}</p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className='modalfooter'>
//           <Button variant='primary' onClick={handleClose} className='button'>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default EditProfileModal;
