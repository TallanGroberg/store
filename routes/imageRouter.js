const express = require('express')
const imageRouter = express.Router()

const firebase = require('firebase')
// firebase( 'firebase/storage')




var firebaseConfig = {
  apiKey: "AIzaSyA07q-Zb3fRwDK8izVOlT75_P_B1cyDn6g",
  authDomain: "the-stor-e.firebaseapp.com",
  databaseURL: "https://the-stor-e.firebaseio.com",
  projectId: "the-stor-e",
  storageBucket: "the-stor-e.appspot.com",
  messagingSenderId: "11488559578",
  appId: "1:11488559578:web:8ac7c02bd963087e0540e3",
  measurementId: "G-83RSJKFCFF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const storage = firebase.storage()




imageRouter.post('/', (req,res) => {
  console.log(req, res)
  })

  



module.exports = imageRouter