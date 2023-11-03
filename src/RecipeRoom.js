import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RecipePage from "./Pages/RecipePage/RecipePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Register from "./Pages/AuthenticationPages/SignupPage";
import Login from "./Pages/AuthenticationPages/LoginPage";
import GroupPage from "./Pages/GroupPage/GroupPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function RecipeRoom() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/group" element={<GroupPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default RecipeRoom;
