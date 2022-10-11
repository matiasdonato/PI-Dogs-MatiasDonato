import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";

import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import store, {persistor} from './redux/store/store.js';
import { PersistGate } from "redux-persist/lib/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
