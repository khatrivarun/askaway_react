import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as AuthActions from './../../store/actions/auth';
import {
  Switch,
  BrowserRouter as Router,
  Route as PublicRoute,
} from 'react-router-dom';
import { auth } from './../../utils/Firebase';
import UserFormPage from '../../pages/UserForm';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user;
        await dispatch(AuthActions.autoLogin(uid));
      } else {
        dispatch(AuthActions.logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/register' component={UserFormPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
