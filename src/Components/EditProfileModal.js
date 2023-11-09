import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { MAIN_DOMAIN } from "../utils/constants";
import { alert_error, alert_success } from "../utils/toast_messages";
import {
  getHTTPHeaderWithToken,
  getLoggedInUserDetails,
  getSendingDataSpinner,
} from "../utils/functions";

function EditProfileModal() {
  const [show, setShow] = useState(false);
  const authUser = useContext(AuthContext).authUser;
  const [uploadingToCloudinary, setUploadingToCloudinary] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    profile_photo: image || authUser?.profile_photo || "",
    first_name: authUser?.first_name || "",
    last_name: authUser?.last_name || "",
    email: authUser?.email || "",
    country: authUser?.country || "",
  });

  const id = getLoggedInUserDetails()?.id;

  useEffect(() => {
    getProfileData();
  }, [id]);

  const getProfileData = () => {
    fetch(`${MAIN_DOMAIN}/users/${id}`, getHTTPHeaderWithToken())
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        console.log("Original data", data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getProfileData();
    setShow(true);
  };

  const handleSaveChanges = () => {
    const id = getLoggedInUserDetails()?.id;
    const token = getHTTPHeaderWithToken(); // Replace with your actual JWT token
    const updatedData = {
      first_name: formData.first_name || authUser?.first_name || "",
      last_name: formData.last_name || authUser?.last_name || "",
      username: formData.email || authUser?.email || "",
      email: formData.email || authUser?.email || "",
      profile_photo: image || authUser?.profile_photo || "",
      country: formData.country || authUser?.country || "",
      phone_number: authUser?.phone_number || "",
    };
    console.log("Updated Data", updatedData);
    const headers = {
      Accept: "application/json",
      Authorization: token.headers.Authorization,
      "Content-Type": "application/json",
    };

    fetch(`${MAIN_DOMAIN}/users/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          console.log("Profile updated:", data);
          alert_success("Profile updated successfully!");
          handleClose();
        } else {
          throw new Error(data.detail || "Error updating profile.");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert_error("Error updating profile. Please try again.");
      });
  };

  const storeProfileImageOnCloudinary = async (file) => {
    setUploadingToCloudinary(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pgrhqetg");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzv8hj78f/image/upload",
        formData
      );
      const imageUrl = response.data.url;
      setImage(imageUrl);
      setUploadingToCloudinary(false);
    } catch (err) {
      setUploadingToCloudinary(false);
      alert_error("Failed to upload image. Please try again later.");
    }
  };

  return (
    <>
      <a onClick={handleShow} id="editProfile">
        Edit Profile
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalbody">
          <div className="first-column ">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => storeProfileImageOnCloudinary(e.target.files[0])}
            />
            {uploadingToCloudinary ? (
              <div className="spinner-loader">{getSendingDataSpinner()}</div>
            ) : null}
            {image ? (
              <img src={image} alt="user profile" className="profiling" />
            ) : authUser ? (
              <img
                src={authUser.profile_photo}
                alt="user profile"
                className="profiling"
              />
            ) : null}
          </div>
          <input
            type="text"
            className="editinputes"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            className="editinputes"
            placeholder="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer className="modaolfooter">
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            className="button footer-btn"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfileModal;
