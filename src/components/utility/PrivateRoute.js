import { Redirect, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/Firebase';
import LoadingPage from '../../pages/Loading';

const PrivateRoute = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <LoadingPage />
  ) : user ? (
    <Route {...props} />
  ) : (
    <Redirect to='/login' />
  );
};

export default PrivateRoute;
