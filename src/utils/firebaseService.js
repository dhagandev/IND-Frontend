import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
    appId: process.env.REACT_APP_APP_ID
});

// Apis and config vars

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();


// functions

function login() {
    console.log("LOGIN")
    return auth.signInWithPopup(provider);
}

function logout() {
    console.log("LOGOUT")
    return auth.signOut();
}

export {
    auth,
    login,
    logout
}