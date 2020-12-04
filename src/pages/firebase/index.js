import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD_3Y9liwoMyKnl9LVho4TfNWpHbtwuOl4",
  authDomain: "tuvandaihoc-c8a1c.firebaseapp.com",
  databaseURL: "https://tuvandaihoc-c8a1c.firebaseio.com",
  projectId: "tuvandaihoc-c8a1c",
  storageBucket: "tuvandaihoc-c8a1c.appspot.com",
  messagingSenderId: "760975696935",
  appId: "1:760975696935:web:6aa40eb05b35bb3ac31a02",
  measurementId: "G-Y2Z8MQG7G3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}