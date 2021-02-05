import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../config/firebase';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestoreDb = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
