import { auth } from './../../utils/Firebase';

export const SIGN_IN = 'SIGN IN';
export const SIGN_OUT = 'SIGN OUT';

/**
 * [NOT COMPLETED]
 * Fires whenever there is a change in the auth
 * state listener provided by firebase.
 * @param {string} uid
 */
export const autoLogin = (uid) => {
  return async (dispatch) => {
    // TODO: GET USER DATA FROM FIRESTORE
    dispatch({
      type: SIGN_IN,
      payload: {
        uid: uid,
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

      // Send them a verification mail to verify their mail address.
      await user.sendEmailVerification();

      // TODO: SYNC USERS WITH FIRESTORE.

      // Update Redux State.
      dispatch({
        type: SIGN_IN,
        payload: {
          uid: user.uid,
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
 * Log a user into the application with Firebase.
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

      // TODO: FETCH THE USER DOCUMENT FROM FIRESTORE.

      // Update Redux State.
      dispatch({
        type: SIGN_IN,
        payload: {
          uid: user.uid,
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
