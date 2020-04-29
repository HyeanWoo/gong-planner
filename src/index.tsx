import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';
import firebase from './app/firebase';
import firebaseConfig from './app/firebase/firebase.json';
import * as serviceWorker from './app/serviceWorker';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();