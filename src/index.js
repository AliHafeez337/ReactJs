import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProviderComp } from './store/auth-Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProviderComp>
    <App />
  </AuthContextProviderComp>
);
