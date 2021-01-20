import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from './../../store/actions/auth';
import { Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import PrivateRoute from '../utility/PrivateRoute';
import { auth } from './../../utils/Firebase';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // auth.signInWithEmailAndPassword('test@test.com', 'test123');

    return auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        const { uid } = user;
        dispatch(authActions.autoLogin(uid));
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <PrivateRoute redirectTo='/' path='/protected'>
          <h1>Protected</h1>
        </PrivateRoute>
      </Switch>
      <h1>Oii</h1>
      <Link to='/protected'>Protected</Link>
    </Router>
  );
};

export default Routes;
