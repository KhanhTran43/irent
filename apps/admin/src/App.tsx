import './App.css';

import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';

import { authProvider, dataProvider } from './provider';

// TODO: update api
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource edit={EditGuesser}  list={ListGuesser} name="warehouse" show={ShowGuesser}/>
  </Admin>
);

export default App;

