import firebase from 'firebase/app'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "the-stor-e.firebaseapp.com",
  databaseURL: "https://the-stor-e.firebaseio.com",
  projectId: "the-stor-e",
  storageBucket: "the-stor-e.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);


const storage = firebase.storage()

export {
  storage, firebase as default
}

