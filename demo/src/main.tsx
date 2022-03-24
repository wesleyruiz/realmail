import { render } from 'react-dom';
import React from 'react';
import Login from './pages/Login';
import { UserStorage } from './utils/user-storage';
import App from './App';

UserStorage.getAccount()
  .then(user => {
    if (user) {
      render(<App />, document.getElementById('root'));
    } else {
      render(<Login />, document.getElementById('root'));
    }
  })
  .catch(() => {
    render(<Login />, document.getElementById('root'));
  });
