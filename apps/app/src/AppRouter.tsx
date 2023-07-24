import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import Home from './containers/Home/Home';
import WarehouseDetails from './containers/WarehouseDetails/WarehouseDetails';
import ListWarehouse from './containers/ListWarehouse/ListWarehouse';
import RentingForm from './containers/RentingForm/RentingForm';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<ListWarehouse />} />
        <Route path="/warehouse/:id" element={<WarehouseDetails />} />
        <Route path="/warehouse/:id/renting" element={<RentingForm />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
