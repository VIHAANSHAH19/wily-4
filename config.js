import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyBTczOw_FRLRr2D8hXU2ysbfRn6tXMK4JA",
    authDomain: "project-34-d1815.firebaseapp.com",
    databaseURL: "https://project-34-d1815.firebaseio.com",
    projectId: "project-34-d1815",
    storageBucket: "project-34-d1815.appspot.com",
    messagingSenderId: "296489609130",
    appId: "1:296489609130:web:19bff325a9a2cb899e2dd3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()