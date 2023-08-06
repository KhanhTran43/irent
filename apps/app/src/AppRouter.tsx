import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import CreateWarehouse from './containers/CreateWarehouse/CreateWarehouse';
import Home from './containers/Home/Home';
import ListWarehouse from './containers/ListWarehouse/ListWarehouse';
import Login from './containers/Login/Login';
import RentingForm from './containers/RentingForm/RentingForm';
import SignUp from './containers/SignUp/SignUp';
import WarehouseDetails from './containers/WarehouseDetails/WarehouseDetails';

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
        <Route path="/create" element={<CreateWarehouse />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
