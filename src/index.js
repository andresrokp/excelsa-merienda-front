import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { firebaseConfig } from './Functionalities/Firebase/config-firebase';
// import { initializeApp } from "firebase/app";

// const dbManager = initializeApp(firebaseConfig);
// console.log(dbManager)

ReactDOM.render(
  <App />,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
