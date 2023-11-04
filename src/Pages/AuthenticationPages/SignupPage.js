import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import registerImage from "../../assets/login.png";
import axios from "axios";
import { alert_error, alert_success } from "../../utils/toast_messages";
import { getSendingDataSpinner } from "../../utils/functions";
import { MAIN_DOMAIN } from "../../utils/constants";

const Register = () => {
  const navigate = useNavigate();
  const [uploadingToCloudinary, setUploadingToCloudinary] = useState(false);
  const formSchema = yup.object().shape({
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    username: yup.string().email().required("usename required"),
    profile_photo: yup.string(),
    email: yup.string().email().required("email required"),
    password: yup.string().required("Password required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must much")
      .required("Required"),
    country: yup.string().required("Required"),
    phone_number: yup.string().required("Required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      profile_photo: "",
      email: "",
      password: "",
      country: "",
      phone_number: "",
      confirm_password: "",
    },
    validationSchema: formSchema,
    onSubmit: (user) => {
      handleRegister(user);
    },
  });

  const handleRegister = (user) => {
    axios
      .post(`${MAIN_DOMAIN}/auth/register`, user)
      .then((resp) => {
        if (resp.status === 201) {
          formik.setSubmitting(false);
          navigate("/login");
          alert_success("Account created successfully!");
        } else {
          formik.setSubmitting(false);
          alert_error("Account not created. Check your details and try again.");
        }
      })
      .catch((error) => {
        formik.setSubmitting(false);
        alert_error("Error creating account. Try later");
      });
  };

  const storeProfileImageOnCloudinary = async (file) => {
    setUploadingToCloudinary(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pgrhqetg");
    await axios
      .post("https://api.cloudinary.com/v1_1/dzv8hj78f/image/upload", formData)
      .then((resp) => {
        console.log(resp.data.url);
        formik.setFieldValue("profile_photo", resp.data.url);
        setUploadingToCloudinary(false);
      })
      .catch((err) => {
        setUploadingToCloudinary(false);
        alert_error("Failed to load image. Try again later");
      });
  };

  console.log(formik);

  return (
    <div className="form-c">
      <div className="containerR">
        <h2 className="h2reg">Sign Up</h2>
        <form className="my-rform" onSubmit={formik.handleSubmit}>
          <div>
            <input
              className="register-inp"
              type="text"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              placeholder="First Name"
              required
            />
            <span className="error">
              {formik.touched.first_name && formik.errors.first_name
                ? formik.errors.first_name
                : null}
            </span>
          </div>
          <div>
            <input
              className="register-inp"
              type="text"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              placeholder="Last Name"
              required
            />
            <span className="error">
              {formik.touched.last_name && formik.errors.last_name
                ? formik.errors.last_name
                : null}
            </span>
          </div>
          <div>
            <input
              className="register-inp"
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Username"
              required
            />
            <span className="error">
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null}
            </span>
          </div>
          <div>
            <input
              className="register-inp"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
              required
            />
            <span className="error">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </span>
          </div>
          <div>
            <input
              className="register-inp"
              type="tel"
              name="phone_number"
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              placeholder="Phone number"
              required
            />
            <span className="error">
              {formik.touched.phone_number && formik.errors.phone_number
                ? formik.errors.phone_number
                : null}
            </span>
          </div>
          <div>
            <input
              className="register-inp"
              type="text"
              name="country"
              onChange={formik.handleChange}
              value={formik.values.country}
              placeholder="Country"
              required
            />
            <span className="error">
              {formik.touched.country && formik.errors.country
                ? formik.errors.country
                : null}
            </span>
          </div>
          <div>
            <label htmlFor="avatar">Choose a profile picture:</label>
            <input
              id="avatar"
              className="register-inp"
              type="file"
              onChange={(e) => storeProfileImageOnCloudinary(e.target.files[0])}
              value=""
              accept="image/png, image/jpeg"
            />
            {uploadingToCloudinary ? (
              <div className="spinner-loader">{getSendingDataSpinner()}</div>
            ) : null}
          </div>
          <div>
            <input type="text" name="profile_photo" hidden />
          </div>
          <div></div>
          <div>
            <input
              className="register-inp"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              className="register-inp"
              type="password"
              name="confirm_password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              placeholder="Confirm password"
              required
            />
          </div>
          {formik.isSubmitting ? (
            <div className="spinner-loader">{getSendingDataSpinner()}</div>
          ) : (
            <button className="register-btn" type="submit">
              Sign Up
            </button>
          )}

          <p className="pl1">Existing User?</p>
          <Link to="/login" className="pl2">
            Sign In
          </Link>
        </form>
      </div>
      <img className="img-c" src={registerImage} alt="register" />
    </div>
  );
};

export default Register;
