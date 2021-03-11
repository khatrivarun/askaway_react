import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const authState = useSelector((state) => state.auth);
  console.log(authState.user);
  if (authState.user) {
    return <Route exact path={props.path} component={props.component} />;
  } else {
    return <Redirect to={props.redirectTo}></Redirect>;
  }
};

export default PrivateRoute;
