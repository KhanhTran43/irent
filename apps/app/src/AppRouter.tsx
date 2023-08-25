import { noop } from 'lodash';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { PersistLogin } from './auth';
import { Header } from './components/Common/Header';
import { NotFound } from './components/Fallback';
import { MapView } from './components/Map';
import { MapSearchBox } from './components/Map/MapSearchBox';
import { SignUp } from './containers';
import { Contract } from './containers/Contract';
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
  min-width: 1024px;
  width: fit-content;
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
              <Route element={<Contract />} path="contract"></Route>
            </Route>
            <Route element={<CreateWarehouse />} path="create" />
          </Route>
        </Route>
        <Route element={<RootWrapper />} path="/*">
          <Route element={<Login />} path="login" />
          <Route element={<SignUp />} path="sign-up" />
          <Route element={<NotFound />} path="*" />
        </Route>
        <Route path="dev/*">
          <Route element={<UploadImageButton onImageUploaded={noop} />} path="upload" />
          <Route element={<MapSearchBox />} path="map-search-box"></Route>
          <Route
            element={
              <MapView
                location={{
                  lat: 16.02298393469663,
                  lng: 108.1880701495974,
                }}
              />
            }
            path="map-view"
          ></Route>
          <Route element={<Contract />} path="contract"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
