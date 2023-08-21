import { noop } from 'lodash';
import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { PersistLogin } from './auth';
import { Header } from './components/Common/Header';
import { SignUp } from './containers';
import CreateWarehouse from './containers/CreateWarehouse/CreateWarehouse';
import Home from './containers/Home/Home';
import ListWarehouse from './containers/ListWarehouse/ListWarehouse';
import Login from './containers/Login/Login';
import RentingForm from './containers/RentingForm/RentingForm';
import { UploadImageButton } from './containers/UploadImageButton/UploadImageButton';
import { WarehouseDetails } from './containers/WarehouseDetails/WarehouseDetails';
import { WarehouseResolver } from './resolver/WarehouseResolver';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Signika Negative', sans-serif;
        margin: 0;
    }
`;

const BackgroundWrapper = styled.div`
  background-color: #eee;
  padding: 16px 0;
  min-height: calc(100vh - 60px - 32px); //100vh - header_height - total_self_padding
`;

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto 32px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
`;

const RootWrapper = () => {
  return (
    <>
      <Header></Header>
      <GlobalStyle />
      <BackgroundWrapper>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </BackgroundWrapper>
    </>
  );
};

export const AppRouter = () => {
  console.log();

  return (
    // TODO: RequireAuthResolver for auth user data,
    // not using AuthStore for getting user anymore (user in store can be undefined)
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />} path="/*">
          <Route element={<RootWrapper />}>
            <Route element={<Home />} path="" />
            <Route element={<Home />} path="home" />
            <Route element={<ListWarehouse />} path="list" />
            <Route element={<WarehouseResolver />} path="warehouse/:id/*">
              <Route element={<WarehouseDetails />} path="" />
              <Route element={<RentingForm />} path="renting" />
            </Route>
            <Route element={<CreateWarehouse />} path="create" />
          </Route>
        </Route>
        <Route element={<RootWrapper />} path="/*">
          <Route element={<Login />} path="login" />
          <Route element={<SignUp />} path="sign-up" />
          <Route element={<Login />} path="*" />
          <Route element={<UploadImageButton setImageUrl={noop} />} path="upload" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
