import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const authState = useSelector((state) => state.auth);
  if (authState) {
    if (authState.user) {
      return (
        <Route exact path={props.path}>
          {props.children}
        </Route>
      );
    } else {
      return <Redirect to={props.redirectTo}></Redirect>;
    }
  }
};

export default PrivateRoute;
