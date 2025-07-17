import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DataProvider, InertProvider } from './components';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <InertProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </InertProvider>
  </React.StrictMode>
);
