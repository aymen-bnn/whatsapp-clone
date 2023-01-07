import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN9P12lbJIZFieI-r1FWD-SFdFY4O0b7E",
    authDomain: "whatsapp-2-00.firebaseapp.com",
    projectId: "whatsapp-2-00",
    storageBucket: "whatsapp-2-00.appspot.com",
    messagingSenderId: "786474865696",
    appId: "1:786474865696:web:c355b9349f8b12d7c05845",
    measurementId: "G-LMB9KNB5ET"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export { db , auth , provider }
