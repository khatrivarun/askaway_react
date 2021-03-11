import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../config/firebase';
import { User } from './../models/user';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestoreDb = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const emailAuthProvider = firebase.auth.EmailAuthProvider;

export const getCurrentUser = async () => {
  const uid = auth.currentUser.uid;
  const userDb = firestoreDb.collection('users');
  const loggedInUser = new User();

  // Getting firestore user record.
  const firestoreDoc = userDb.doc(uid);
  const userDoc = await firestoreDoc.get();

  // Setup logged in user with data from firestore.
  loggedInUser.fromJSON(userDoc.data());
};
