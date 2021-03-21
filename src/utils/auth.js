import {
  auth,
  googleAuthProvider,
  emailAuthProvider,
  firestoreDb,
  firebaseStorage,
  firebaseRef,
} from './../utils/Firebase';
import { User } from './../models/user';
import * as ContributorFields from './contributorsFields';

const userDb = firestoreDb.collection('users');
const profilePictureStorage = firebaseStorage.child('/profile-pictures');

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getUserFromFirebase = async (uid) => {
  const loggedInUser = new User();

  // Getting user data from firestore.
  const firestoreDoc = userDb.doc(uid);
  const userDoc = await firestoreDoc.get();

  // Setup logged in user with data from firestore.
  loggedInUser.fromJSON(userDoc.data());

  return loggedInUser;
};

/**
 * Fires whenever there is a change in the auth
 * state listener provided by firebase or if explicitly
 * called.
 */
export const logout = async () => {
  await auth.signOut();
};

/**
 * Register a new user's credentials in
 * firebase and automatically log them in the
 * application.
 * @param {string} email
 * @param {string} password
 */
export const emailAndPasswordRegister = async (
  email,
  password,
  firstName,
  lastName
) => {
  try {
    // Create a new user record in FirebaseAuth with the given credentials.
    const result = await auth.createUserWithEmailAndPassword(email, password);

    // Get the user object from the result.
    const user = result.user;

    await user.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });

    const loggedInUser = new User();

    // Setup logged in user with data for firestore.
    loggedInUser.fromJSON({
      displayName: `${firstName} ${lastName}`,
      emailAddress: user.email,
      photoUrl: '',
      userId: user.uid,
      followers: [],
      following: [],
    });

    // Saving user data to firestore
    await userDb.doc(loggedInUser.userId).set(loggedInUser.toJSON());

    // Send them a verification mail to verify their mail address.
    await user.sendEmailVerification();
  } catch (error) {
    // If email is already in use.
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('The email address you provided is already in use.');
    }

    // If email is invalid
    if (error.code === 'auth/invalid-email') {
      throw new Error('The email address you provided is invalid.');
    }
  }
};

/**
 * Log a user into the application with Firebase
 * using email and password combination.
 * @param {string} email
 * @param {string} password
 */
export const emailAndPasswordLogin = async (email, password) => {
  try {
    // Logina user using FirebaseAuth with the given credentials.
    const result = await auth.signInWithEmailAndPassword(email, password);

    // Get the user object from the result.
    const user = result.user;
    const loggedInUser = new User();

    // Getting user data from firestore.
    const firestoreDoc = userDb.doc(user.uid);
    const userDoc = await firestoreDoc.get();

    // Setup logged in user with data from firestore.
    loggedInUser.fromJSON(userDoc.data());
  } catch (error) {
    // If user does not exist.
    if (error.code === 'auth/user-not-found') {
      throw new Error('This email is not registered to any account.');
    }

    // If user provided a wrong password.
    if (error.code === 'auth/wrong-password') {
      throw new Error('You have typed a wrong password, please try again.');
    }
  }
};

/**
 * Send an email for password reset.
 * @param {string} email
 */
export const passwordReset = async (email) => {
  try {
    // Send password reset mail.
    await auth.sendPasswordResetEmail(email);
  } catch (error) {
    // If the email does not belong to any user.
    if (error.code === 'auth/user-not-found') {
      throw new Error('This email is not registered to any account.');
    }

    // If the email is in an incorrect format.
    if (error.code === 'auth/invalid-email') {
      throw new Error('The email address you provided is invalid.');
    }
  }
};

/**
 * Log a user into the application with Firebase
 * using Google account.
 */
export const googleSignUp = async () => {
  try {
    // Select account to login from.
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

    // Get the result of the login which contains the logged in user.
    const result = await auth.signInWithPopup(googleAuthProvider);

    // Get the user object from the result.
    const user = result.user;
    const loggedInUser = new User();

    // Checking if its a new user or an existing user
    if (await checkForAccountExistence(user.uid)) {
      // Getting user data from firestore.
      const firestoreDoc = userDb.doc(user.uid);
      const userDoc = await firestoreDoc.get();

      // Setup logged in user with data from firestore.
      loggedInUser.fromJSON(userDoc.data());
    } else {
      // Setup logged in user with data for firestore.
      loggedInUser.fromJSON({
        displayName: user.displayName,
        emailAddress: user.email,
        photoUrl: user.photoURL,
        userId: user.uid,
        followers: [],
        following: [],
      });

      // Saving user data to firestore
      await userDb.doc(loggedInUser.userId).set(loggedInUser.toJSON());
    }
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error(
        'auth/account-exists-with-different-credential is not implemented yet'
      );
    }
  }
};

/**
 * Changing the password of the logged in user
 * @param {string} oldPassword
 * @param {string} newPassword
 */
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const currentUser = auth.currentUser;

    const credential = emailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );

    await currentUser.reauthenticateWithCredential(credential);
    await currentUser.updatePassword(newPassword);
  } catch (error) {
    if (error.code === 'auth/weak-password') {
      throw new Error('Password provided is weak.');
    }
  }
};

/**
 *
 * @param {string} password
 * @param {string} newEmail
 */
export const changeEmail = async (password, newEmail) => {
  try {
    const currentUser = auth.currentUser;

    const credential = emailAuthProvider.credential(
      currentUser.email,
      password
    );

    await currentUser.reauthenticateWithCredential(credential);
    await currentUser.updateEmail(newEmail);

    await userDb.doc(currentUser.uid).update({
      emailAddress: newEmail,
    });

    const loggedInUser = new User();

    // Getting firestore user record.
    const firestoreDoc = userDb.doc(currentUser.uid);
    const userDoc = await firestoreDoc.get();

    // Setup logged in user with data from firestore.
    loggedInUser.fromJSON(userDoc.data());
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      throw new Error('Email provided is in an invalid format');
    } else if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email provided is already in use.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password given');
    }
  }
};

export const deleteAccount = async (password) => {
  try {
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    const credential = emailAuthProvider.credential(
      currentUser.email,
      password
    );
    await currentUser.reauthenticateWithCredential(credential);

    await userDb.doc(uid).delete();
    await currentUser.delete();

    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Chdcking for user data existence in firebase
 * @param {string} userId User ID from firebase auth
 */
const checkForAccountExistence = async (userId) => {
  const userDocument = userDb.doc(userId);

  const userDoc = await userDocument.get();

  if (userDoc.exists) {
    return true;
  } else {
    return false;
  }
};

export const updateName = async (newName) => {
  const user = auth.currentUser;

  await user.updateProfile({
    displayName: newName,
  });

  await userDb.doc(user.uid).update({
    displayName: newName,
  });
};

export const updateProfilePicture = async (file) => {
  const user = getCurrentUser();
  const uid = user.uid;

  await profilePictureStorage.child(`${uid}.jpg`).put(file);

  const url = await profilePictureStorage.child(`${uid}.jpg`).getDownloadURL();

  await user.updateProfile({
    photoURL: url,
  });

  await userDb.doc(uid).update({
    photoUrl: url,
  });
};

export const followUser = async (userUid) => {
  const loggedInUser = getCurrentUser();
  const loggedInUserRef = userDb.doc(loggedInUser.uid);
  const toFollowUserRef = userDb.doc(userUid);

  await loggedInUserRef.update({
    following: firebaseRef.firestore.FieldValue.arrayUnion(userUid),
  });

  await toFollowUserRef.update({
    followers: firebaseRef.firestore.FieldValue.arrayUnion(loggedInUser.uid),
  });
};

export const incrementCount = async (fieldValue) => {
  const loggedInUser = getCurrentUser();
  const loggedInUserRef = userDb.doc(loggedInUser.uid);

  switch (fieldValue) {
    case ContributorFields.ANSWERS_PICKED: {
      await loggedInUserRef.update({
        answersPicked: firebaseRef.firestore.FieldValue.increment(1),
      });
      break;
    }

    case ContributorFields.QUESTIONS_ANSWERED: {
      await loggedInUserRef.update({
        questionsAnswered: firebaseRef.firestore.FieldValue.increment(1),
      });
      break;
    }

    case ContributorFields.QUESTIONS_ASKED: {
      await loggedInUserRef.update({
        questionsAsked: firebaseRef.firestore.FieldValue.increment(1),
      });
      break;
    }

    default: {
      console.log('default');
    }
  }
};
