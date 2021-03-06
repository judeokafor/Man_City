import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDghRURsdNkAVhHxETWC726Oi65AeMWUig",
  authDomain: "m-city-39946.firebaseapp.com",
  databaseURL: "https://m-city-39946.firebaseio.com",
  projectId: "m-city-39946",
  storageBucket: "m-city-39946.appspot.com",
  messagingSenderId: "110308676595"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
};
