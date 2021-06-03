import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyA-wmj0-ezSg1W_OLUk_IvX3UTZQEFkz-4",
    authDomain: "financasreact.firebaseapp.com",
    databaseURL: "https://financasreact-default-rtdb.firebaseio.com",
    projectId: "financasreact",
    storageBucket: "financasreact.appspot.com",
    messagingSenderId: "934947181302",
    appId: "1:934947181302:web:3af64973e291d010eb12d7",
    measurementId: "G-3BE60PXNJC"
  };

  /*
  firebaseConfig = {
    apiKey: "AIzaSyA-wmj0-ezSg1W_OLUk_IvX3UTZQEFkz-4",
    authDomain: "financasreact.firebaseapp.com",
    databaseURL: "https://financasreact-default-rtdb.firebaseio.com",
    projectId: "financasreact",
    storageBucket: "financasreact.appspot.com",
    messagingSenderId: "934947181302",
    appId: "1:934947181302:web:3af64973e291d010eb12d7",
    measurementId: "G-3BE60PXNJC"
  };*/

  
  /*if(firebase.app.length == 0){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }*/

  firebase.initializeApp(firebaseConfig);

  export default firebase;