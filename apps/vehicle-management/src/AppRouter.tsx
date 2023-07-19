import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import Home from './containers/Home/Home';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
