import './App.css';

import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';

import { TransactionDetails } from './components/TransactionDetails';
import { TransactionEdit } from './components/TransactionEdit';
import { TransactionList } from './components/TransactionList';

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const dataProvider = jsonServerProvider('https://7477-2001-f40-95c-38e1-1850-aac0-f77b-3419.ngrok.io/evaluationForm');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource edit={TransactionEdit} list={TransactionList} name="transaction" show={TransactionDetails} />
    {/* <Resource name="users" list={ListGuesser} /> */}
  </Admin>
);

export default App;

