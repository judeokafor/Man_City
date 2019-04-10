import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
   apiKey: 'AIzaSyDghRURsdNkAVhHxETWC726Oi65AeMWUig',
   authDomain: 'm-city-39946.firebaseapp.com',
   databaseURL: 'https://m-city-39946.firebaseio.com',
   projectId: 'm-city-39946',
   storageBucket: 'm-city-39946.appspot.com',
   messagingSenderId: '110308676595'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export { firebase, firebaseMatches };
