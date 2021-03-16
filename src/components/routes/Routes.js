import {
  Switch,
  BrowserRouter as Router,
  Route as PublicRoute,
} from 'react-router-dom';
import UserFormPage from '../../pages/UserForm';
import QuestionsPage from '../../pages/Questions';
import PrivateRoute from '../utility/PrivateRoute';
import AccountEditPage from '../../pages/AccountEdit';
import SplashPage from '../../pages/Splash';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/' component={SplashPage} />
        <PublicRoute exact path='/register' component={UserFormPage} />
        <PublicRoute exact path='/login' component={UserFormPage} />
        <PrivateRoute exact path='/questions' component={QuestionsPage} />
        <PrivateRoute exact path='/account/edit' component={AccountEditPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
