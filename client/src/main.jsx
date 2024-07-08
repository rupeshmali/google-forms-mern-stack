import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from './slices/form.js';
import { Provider } from 'react-redux';
import { api } from './slices/formApi.js';


const store = configureStore({
  reducer: {
    form: formReducer
  },
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
