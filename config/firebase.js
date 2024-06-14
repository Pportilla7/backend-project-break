// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "ejercicio-tiendaropa.firebaseapp.com",
  projectId: "ejercicio-tiendaropa",
  storageBucket: "ejercicio-tiendaropa.appspot.com",
  messagingSenderId: "847935091917",
  appId: "1:847935091917:web:5a3f5c80c72e22c03e2584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

module.exports={auth,signInWithEmailAndPassword};



