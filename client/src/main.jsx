import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'

import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';

import '@fontsource/source-sans-pro';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomProvider theme="dark">
      <App />
    </CustomProvider>
  </React.StrictMode>
)
