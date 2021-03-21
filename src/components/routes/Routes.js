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
import QuestionPage from '../../pages/Question';
import QuestionEditFormWrapperPage from '../../pages/QuestionEditFormWrapper';
import UserProfilePage from '../../pages/UserProfile';

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
        <PrivateRoute
          exact
          path='/questions/:id'
          render={(props) => <QuestionPage id={props.match.params.id} />}
        />
        <PrivateRoute
          exact
          path='/questions/:id/update'
          render={(props) => (
            <QuestionEditFormWrapperPage id={props.match.params.id} />
          )}
        />
        <PrivateRoute exact path='/account/me' component={UserProfilePage} />
        <PrivateRoute
          exact
          path='/account/:id'
          render={(props) => <UserProfilePage uid={props.match.params.id} />}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
