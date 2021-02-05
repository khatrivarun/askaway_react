import {
  auth,
  googleAuthProvider,
  emailAuthProvider,
  firestoreDb,
} from './../../utils/Firebase';
import { User } from './../../models/user';

export const SIGN_IN = 'SIGN IN';
export const SIGN_OUT = 'SIGN OUT';

const userDb = firestoreDb.collection('users');

/**
 * [NOT COMPLETED]
 * Fires whenever there is a change in the auth
 * state listener provided by firebase.
 * @param {string} uid
 */
export const autoLogin = (uid) => {
  return async (dispatch) => {
    const loggedInUser = new User();

    // Getting firestore user record.
    const firestoreDoc = userDb.doc(uid);
    const userDoc = await firestoreDoc.get();

    // Setup logged in user with data from firestore.
    loggedInUser.fromJSON(userDoc.data());
    dispatch({
      type: SIGN_IN,
      payload: {
        user: loggedInUser,
      },
    });
  };
};

/**
 * Fires whenever there is a change in the auth
 * state listener provided by firebase or if explicitly
 * called.
 */
export const logout = () => {
  return async (dispatch) => {
    await auth.signOut();

    dispatch({
      type: SIGN_OUT,
    });
  };
};

/**
 * Register a new user's credentials in
 * firebase and automatically log them in the
 * application.
 * @param {string} email
 * @param {string} password
 */
export const emailAndPasswordRegister = (email, password) => {
  return async (dispatch) => {
    try {
      // Create a new user record in FirebaseAuth with the given credentials.
      const result = await auth.createUserWithEmailAndPassword(email, password);

      // Get the user object from the result.
      const user = result.user;
      const loggedInUser = new User();

      // Setup logged in user with data for firestore.
      loggedInUser.fromJSON({
        displayName: 'New User',
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

      // Update Redux State.
      dispatch({
        type: SIGN_IN,
        payload: {
          user: loggedInUser,
        },
      });
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
};

/**
 * Log a user into the application with Firebase
 * using email and password combination.
 * @param {string} email
 * @param {string} password
 */
export const emailAndPasswordLogin = (email, password) => {
  return async (dispatch) => {
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

      // Update Redux State.
      dispatch({
        type: SIGN_IN,
        payload: {
          user: loggedInUser,
        },
      });
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
};

/**
 * Send an email for password reset.
 * @param {string} email
 */
export const passwordReset = (email) => {
  return async () => {
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
};

/**
 * Log a user into the application with Firebase
 * using Google account.
 */
export const googleSignUp = () => {
  return async (dispatch) => {
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

      // Update Redux State.
      dispatch({
        type: SIGN_IN,
        payload: {
          user: loggedInUser,
        },
      });
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        throw new Error(
          'auth/account-exists-with-different-credential is not implemented yet'
        );
      }
    }
  };
};

/**
 * Changing the password of the logged in user
 * @param {string} oldPassword
 * @param {string} newPassword
 */
export const changePassword = (oldPassword, newPassword) => {
  return async (dispatch) => {
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
