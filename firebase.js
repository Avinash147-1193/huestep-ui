import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPM1HDJvzUp089B18baA9bUX13h0piLFs",
  authDomain: "hue-step.firebaseapp.com",
  projectId: "hue-step",
  storageBucket: "hue-step.appspot.com",
  messagingSenderId: "1048498855975",
  appId: "1:1048498855975:web:2a5474348a052d89ba6e02"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;