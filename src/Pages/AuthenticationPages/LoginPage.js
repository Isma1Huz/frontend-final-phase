import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login.css";
import { Link } from "react-router-dom";
import loginImage from "../../assets/signup.png";
import { MAIN_DOMAIN } from "../../utils/constants";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { alert_error } from "../../utils/toast_messages";
import { getSendingDataSpinner } from "../../utils/functions";

const Login = () => {
  const handleLogin = useContext(AuthContext).handleLogin;
  const fetchUserFromServer = (userCredetials) => {
    axios
      .post(`${MAIN_DOMAIN}/auth/login`, userCredetials)
      .then((resp) => {
        if (resp.status === 200) {
          handleLogin(resp.data.access_token);
        } else {
          alert_error("Username or Password is incorrect!!");
        }
      })
      .catch((error) => {
        alert_error("Error doing the login. Try later");
      });
  };
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Must enter a password").min(5),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetchUserFromServer(values);
    },
  });

  return (
    <div className="form-cl">
      <img className="img-cl" src={loginImage} alt="login" width="150" />
      <div className="containerl">
        <h2 className="hl">Sign In</h2>
        <form className="my-form" onSubmit={formik.handleSubmit}>
          <div>
            <input
              className="login-inp"
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p className="error">{formik.errors.email}</p>
          </div>
          <div>
            <input
              className="login-inp"
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className="error">{formik.errors.password}</p>
          </div>
          {formik.isSubmitting ? (
            <div className="spinner-loader">{getSendingDataSpinner()}</div>
          ) : (
            <button className="login-btn" type="submit">
              Login
            </button>
          )}

          <p className="pl3"> Forgot your password</p>
          <p className="pl1"> Don't have an account?</p>
          <Link to="/register" className="pl2">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
