import './App.css';

import { Admin, Resource } from 'react-admin';

import { TransactionDetails } from './components/TransactionDetails';
import { WarehouseList } from './components/WarehouseList';
import { authProvider, dataProvider } from './provider';

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource list={WarehouseList} name="warehouse" show={TransactionDetails} />
  </Admin>
);

export default App;
