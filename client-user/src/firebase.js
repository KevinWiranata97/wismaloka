import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdd9ub6cQy_xdsUntsqzY1PMJ8zz2JWBc",
  authDomain: "test-chat-app-kevin.firebaseapp.com",
  projectId: "test-chat-app-kevin",
  storageBucket: "test-chat-app-kevin.appspot.com",
  messagingSenderId: "462929132026",
  appId: "1:462929132026:web:2fbc0a32d5735f5caacc43",
});

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { auth , db}