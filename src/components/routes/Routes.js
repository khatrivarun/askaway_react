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
import SearchResultsPage from '../../pages/SearchResults';
import * as SearchFields from './../../constants/searchFields';
import _500Page from '../../pages/500';
import _404Page from '../../pages/404';
import CategoryQuestionsPage from '../../pages/CategoryQuestions';
import ForgotPasswordPage from '../../pages/ForgotPassword';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/' component={SplashPage} />
        <PublicRoute exact path='/register' component={UserFormPage} />
        <PublicRoute exact path='/login' component={UserFormPage} />
        <PublicRoute exact path='/forgot' component={ForgotPasswordPage} />
        <PublicRoute exact path='/500' component={_500Page} />
        <PublicRoute exact path='/404' component={_404Page} />
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
        <PrivateRoute
          exact
          path='/search/account/:searchQuery'
          render={(props) => (
            <SearchResultsPage
              searchQuery={props.match.params.searchQuery}
              searchMode={SearchFields.USERS}
            />
          )}
        />
        <PrivateRoute
          exact
          path='/search/questions/:searchQuery'
          render={(props) => (
            <SearchResultsPage
              searchQuery={props.match.params.searchQuery}
              searchMode={SearchFields.QUESTIONS}
            />
          )}
        />
        <PrivateRoute
          exact
          path='/categories/:category'
          render={(props) => (
            <CategoryQuestionsPage category={props.match.params.category} />
          )}
        />
        <PublicRoute path='*' component={_404Page} />
      </Switch>
    </Router>
  );
};

export default Routes;
