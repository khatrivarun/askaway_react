import firebase from 'firebase';
import firebaseConfig from '../config/firebase';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
