import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Details from './Details';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const currency = 'USD';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App currency={currency} />,
  },
  {
    path: '/details/:id',
    element: <Details />,
  },
]);
root.render(
  <React.StrictMode>
    <header>Second Hand</header>
    <RouterProvider router={router} />
    <footer>Hand made</footer>
  </React.StrictMode>
);



