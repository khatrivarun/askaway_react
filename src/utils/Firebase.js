import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../config/firebase';

firebase.initializeApp(firebaseConfig);

export const firebaseRef = firebase;
export const auth = firebase.auth();
export const firestoreDb = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const emailAuthProvider = firebase.auth.EmailAuthProvider;
export const firebaseStorage = firebase.storage().ref();
