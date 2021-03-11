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
import QuestionsPage from '../../pages/Questions';
import PrivateRoute from '../utility/PrivateRoute';
import AccountEditPage from '../../pages/AccountEdit';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(AuthActions.autoLogin(user));
      } else {
        dispatch(AuthActions.logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/register' component={UserFormPage} />
        <PublicRoute exact path='/login' component={UserFormPage} />
        <PublicRoute exact path='/questions' component={QuestionsPage} />
        <PrivateRoute
          path='/account/edit'
          component={AccountEditPage}
          redirectTo='/login'
        />
      </Switch>
    </Router>
  );
};

export default Routes;
