import { createRoot } from 'react-dom/client';
import React from 'react';
import Login from './pages/Login';
import { UserStorage } from './utils/user-storage';
import App from './App';

const root = document.getElementById('root')!;
UserStorage.getAccount()
  .then(user => {

    if (user) {

      createRoot(root).render(<App />,);
    } else {
      createRoot(root).render(<Login />,);
    }
  })
  .catch(() => {
    createRoot(root).render(<Login />,);
  });
