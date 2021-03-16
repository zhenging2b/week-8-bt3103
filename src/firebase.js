import firebase from "firebase"


  const firebaseConfig = {
    apiKey: "AIzaSyDnbIn0XEcF6sB2ISfGDxd1NzW1kK6CEUg",
    authDomain: "bt3103-week-6-aa940.firebaseapp.com",
    projectId: "bt3103-week-6-aa940",
    storageBucket: "bt3103-week-6-aa940.appspot.com",
    messagingSenderId: "805153076342",
    appId: "1:805153076342:web:399313f85f47dce0521b57",
    measurementId: "G-C42EVPM8RQ"
  }
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;