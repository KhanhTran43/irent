import './App.css';

import jsonServerProvider from 'ra-data-json-server';
import { Admin, EditGuesser, Resource, ShowGuesser } from 'react-admin';

import { TransactionDetails } from './components/TransactionDetails';
import { TransactionEdit } from './components/TransactionEdit';
import { TransactionList } from './components/TransactionList';
import { WarehouseList } from './components/WarehouseList';
import { authProvider } from './provider';

// TODO: update api
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
// const dataProvider = jsonServerProvider('https://7477-2001-f40-95c-38e1-1850-aac0-f77b-3419.ngrok.io/evaluationForm');

type Transaction = {
  id: number;
  warehouse: {
    id: number;
    name: string;
  },
  owner: {
    id: number;
    name: string;
  },
  renter: {
    id: number;
    name: string;
  },
  price: string;
  duration: number;
  createdAt: Date;
  fee: number
}

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource edit={TransactionEdit} list={TransactionList} name="transactions" show={TransactionDetails} />
    <Resource edit={EditGuesser}  list={WarehouseList} name="users" show={ShowGuesser}/>
  </Admin>
);

export default App;


// TODO: endpoint

// transactions
// transactions/:id

