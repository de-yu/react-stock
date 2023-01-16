import React from 'react';
import Market from '@/features/market/Market';
import StockRecord from '@/features/StockRecord/StockRecord'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Counter } from './features/counter/Counter';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'office-ui-fabric-core/dist/css/fabric.min.css'
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/Counter',
        element: <Counter />
      },
      {
        path: '/Market',
        element: <Market />
      },
      {
        path: '/StockRecord',
        element: <StockRecord />
      }
    ],
  },
]);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
