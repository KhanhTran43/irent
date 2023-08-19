import './App.css';

import jsonServerProvider from 'ra-data-json-server';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';

import { TransactionDetails } from './components/TransactionDetails';
import { TransactionEdit } from './components/TransactionEdit';
import { TransactionList } from './components/TransactionList';
import { authProvider } from './provider';

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
// const dataProvider = jsonServerProvider('https://7477-2001-f40-95c-38e1-1850-aac0-f77b-3419.ngrok.io/evaluationForm');

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    {/* <Resource edit={TransactionEdit} list={TransactionList} show={TransactionDetails} name="transaction" /> */}
    <Resource name="users"  list={ListGuesser} edit={EditGuesser} show={ShowGuesser}/>
  </Admin>
);

export default App;

