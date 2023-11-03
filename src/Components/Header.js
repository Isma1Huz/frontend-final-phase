import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [userPopUpOpen, setUserPopUpOpen] = useState(false);

  const toggleMenu = () => {
    setIsDisplayed((isDisplayed) => !isDisplayed);
  };
  const toggleUserPopUp = () => {
    setUserPopUpOpen((userPopUpOpen) => !userPopUpOpen);
  };

  const headerPaneClasses = isDisplayed
    ? "header__pane header__pane--show"
    : "header__pane";
  const userPopUpClasses = userPopUpOpen
    ? "user-profile-popup user-profile-popup--show"
    : "user-profile-popup";
  return (
    <header className="header">
      <div className="header__icon">
        <i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
        <img
          src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw="
          alt="user profile"
        />
      </div>
      <div className={headerPaneClasses}>
        <div className="header__left-section">
          <span className="logo">
            Re<span>st</span>Room
          </span>
        </div>

        <div className="header__right-section">
          <nav className="header__nav">
            <Link to="/" className="nav-recipe">
              Recipes
            </Link>
            <div className="header__auth">
              <Link to="login" className="header__link">
                Login
              </Link>
              <Link to="register" className="header__link">
                Register
              </Link>
            </div>
            <div className="header__user">
              <div className="header__notification">
                <i className="fa fa-bell-o" aria-hidden="true"></i>
              </div>
              <div className="header__user-profile">
                <img
                  onClick={toggleUserPopUp}
                  className="header__user-profile-img"
                  src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw="
                  alt="user profile"
                />
                <div
                  className={userPopUpClasses}
                  onMouseLeave={toggleUserPopUp}
                >
                  <img
                    className="header__user-profile-img"
                    src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw="
                    alt="user profile"
                  />
                  <h2 className="username-profile">John Maluki</h2>
                  <Link to="profile" className="edit-profile">
                    Edit Profile
                  </Link>
                  <button className="logout">Logout</button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
