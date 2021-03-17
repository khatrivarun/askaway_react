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
import QuestionsFormPage from '../../pages/QuestionsForm';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/' component={SplashPage} />
        <PublicRoute exact path='/register' component={UserFormPage} />
        <PublicRoute exact path='/login' component={UserFormPage} />
        <PrivateRoute exact path='/questions' component={QuestionsPage} />
        <PrivateRoute exact path='/account/edit' component={AccountEditPage} />
        <PrivateRoute
          exact
          path='/questions/new'
          component={() => <QuestionsFormPage fromLink={true} />}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
