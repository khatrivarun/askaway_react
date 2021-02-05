const { SIGN_IN, SIGN_OUT } = require('../actions/auth');

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      const user = action.payload.user;
      return {
        ...state,
        user: user,
      };
    }

    case SIGN_OUT: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
