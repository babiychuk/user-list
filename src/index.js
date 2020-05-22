import React from 'react';
import ReactDOM from 'react-dom';
import UsersList from './components/UsersList';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <UsersList />
  </Provider>,
  document.getElementById('root')
);
