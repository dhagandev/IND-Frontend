import firebase from 'firebase/app';
import 'firebase/auth';

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: "",
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
//     appId: process.env.REACT_APP_APP_ID
// }

const config = {
  apiKey: "AIzaSyBDRSRNBxFHtnftEmvnjcSUGNqXv3KYD2c",
  authDomain: "narrative-design.firebaseapp.com",
  databaseURL: "https://narrative-design.firebaseio.com",
  projectId: "narrative-design",
  storageBucket: "narrative-design.appspot.com",
  messagingSenderId: "254188595065",
  appId: "1:254188595065:web:d87292fc9aafd6b2"
};

firebase.initializeApp(config);


// Apis and config vars

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();


// functions

function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}

export {
    auth,
    login,
    logout
}