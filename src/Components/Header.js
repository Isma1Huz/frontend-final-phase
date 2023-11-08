import React, { useContext, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [userPopUpOpen, setUserPopUpOpen] = useState(false);
  const authUser = useContext(AuthContext).authUser;
  const logout = useContext(AuthContext).logout;

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

  const handleLogout = () => {
    toggleUserPopUp();
    logout();
  };
  return (
    <header className="header">
      <div className="header__icon">
        <i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
        {authUser ? (
          <img src={authUser?.profile_photo} alt="user profile" />
        ) : null}
      </div>
      <div className={headerPaneClasses}>
        <div className="header__left-section">
          <span className="logo">
            Re<span>cipe</span>Room
          </span>
        </div>

        <div className="header__right-section">
          <nav className="header__nav">
            <Link to="/" className="nav-recipe">
              Recipes
            </Link>
            {!authUser ? (
              <div className="header__auth">
                <Link to="login" className="header__link">
                  Login
                </Link>
                <Link to="register" className="header__link">
                  Register
                </Link>
              </div>
            ) : (
              <div className="header__user">
                <div className="header__notification">
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                </div>
                <div className="header__user-profile">
                  <img
                    onClick={toggleUserPopUp}
                    className="header__user-profile-img"
                    src={authUser?.profile_photo}
                    alt="user profile"
                  />
                  <div
                    className={userPopUpClasses}
                    onMouseLeave={toggleUserPopUp}
                  >
                    <img
                      className="header__user-profile-img"
                      src={authUser?.profile_photo}
                      alt="user profile"
                    />
                    <h2 className="username-profile">{`${authUser.first_name} ${authUser.last_name}`}</h2>
                    <Link to="profile" className="edit-profile">
                      Your profile
                    </Link>
                    <button className="logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
