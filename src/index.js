import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeTodo } from './redux/store';

export const rootModal = document.querySelector("#modal");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter basename="todo2">
    <Provider store={storeTodo}>
      <App></App>
      </Provider>
    </BrowserRouter>
  </>
  
);