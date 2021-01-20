export const SIGN_IN = 'SIGN IN';
export const SIGN_OUT = 'SIGN OUT';

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
