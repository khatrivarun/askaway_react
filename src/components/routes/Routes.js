import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as AuthActions from './../../store/actions/auth';
import { Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import PrivateRoute from '../utility/PrivateRoute';
import { auth } from './../../utils/Firebase';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        dispatch(AuthActions.autoLogin(uid));
      } else {
        dispatch(AuthActions.logout());
      }
    });
  }, [dispatch]);

  const login = () => {
    dispatch(
      AuthActions.emailAndPasswordLogin('varun.h.khatri@gmail.com', 'varun1234')
    )
      .then((_) => {
        console.log('user login');
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    dispatch(AuthActions.logout())
      .then((_) => {
        console.log('user logout');
      })
      .catch((error) => console.log(error));
  };

  const passwordReset = () => {
    dispatch(AuthActions.passwordReset('varun.h.khatri@gmail.com'))
      .then((_) => {
        console.log('user password reset');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute redirectTo='/' path='/protected'>
          <h1>Protected</h1>
          <button onClick={() => logout()}>Logout</button>
        </PrivateRoute>
      </Switch>
      <h1>Oii</h1>
      <button onClick={() => login()}>Login</button>
      <button onClick={() => passwordReset()}>Password Reset</button>
      <Link to='/protected'>Protected</Link>
    </Router>
  );
};

export default Routes;
