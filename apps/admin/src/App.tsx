import './App.css';

import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';

import { CustomLayout } from './components/customs/CustomLayout';
import { RequestWarehouseDetails } from './components/customs/RequestWarehouseDetails';
import { RequestWarehouseList } from './components/customs/RequestWarehouseList';
import { Revenue } from './components/customs/Revenue';
import { WarehouseList } from './components/WarehouseList';
import { authProvider, dataProvider } from './provider';

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} layout={CustomLayout}>
    <Resource list={WarehouseList} name="warehouse"/>
    <CustomRoutes>
      <Route element={<RequestWarehouseList />} path="/request" />
      <Route element={<RequestWarehouseDetails />} path="/request/:id" />
      <Route element={<Revenue />} path="/revenue" />
    </CustomRoutes>
  </Admin>
);

export default App;

