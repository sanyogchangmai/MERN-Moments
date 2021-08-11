import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: "moments-dev-f6b59.firebaseapp.com",
    // projectId: "moments-dev-f6b59",
    // storageBucket: "moments-dev-f6b59.appspot.com",
    // messagingSenderId: "685446575335",
    // appId: "1:685446575335:web:ae90e7535ee990b0c11e42"
})

export const auth = app.auth();
export default app;