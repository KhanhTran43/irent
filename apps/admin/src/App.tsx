import './App.css';

import jsonServerProvider from 'ra-data-json-server';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';

import { authProvider } from './provider';

const dataProvider = jsonServerProvider("http://localhost:7075/api");

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource list={ListGuesser} name="warehouse" show={ShowGuesser}/>
  </Admin>
);

export default App;

