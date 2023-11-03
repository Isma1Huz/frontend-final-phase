import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProfilePage from './Pages/ProfilePage/ProfilePage';
import RecipePage from './Pages/RecipePage/RecipePage';
import LandingPage from './Pages/LandingPage/LandingPage';
import Register from './Pages/AuthenticationPages/SignupPage';
import Login from './Pages/AuthenticationPages/LoginPage';
import GroupPage from './Pages/GroupPage/GroupPage';

function RecipeRoom() {
  return (
    <Router>
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/group" element={<GroupPage />} />
        </Routes>
    </div>
    </Router>
  );
}

export default RecipeRoom;
