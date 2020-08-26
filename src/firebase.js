import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC3DR7UHcOrXJGgyyt-gbc2nOcHY2_l5UY",
  authDomain: "instagram-clone-clever-proger.firebaseapp.com",
  databaseURL: "https://instagram-clone-clever-proger.firebaseio.com",
  projectId: "instagram-clone-clever-proger",
  storageBucket: "instagram-clone-clever-proger.appspot.com",
  messagingSenderId: "579821558495",
  appId: "1:579821558495:web:a4d96ac1a9138add1fe76a",
  measurementId: "G-KZXE32197H",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
