import './App.css';

import { Admin, EditGuesser, Resource, ShowGuesser } from 'react-admin';

import { WarehouseList } from './components/WarehouseList';
import { authProvider, dataProvider } from './provider';

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource edit={EditGuesser}  list={WarehouseList} name="warehouse" show={ShowGuesser}/>
  </Admin>
);

export default App;

