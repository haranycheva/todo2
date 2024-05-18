import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App';
import { CompRef } from 'CompRef/CompRef';
import { BrowserRouter } from 'react-router-dom';

export const rootModal = document.querySelector("#modal");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter basename="todo2">
    <App></App>
  </BrowserRouter>
  </>
  
);