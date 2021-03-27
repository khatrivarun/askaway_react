import { useState, useEffect } from 'react';
import { auth } from './../utils/Firebase';
import LoadingPage from './Loading';
import { Redirect } from 'react-router-dom';

const SplashPage = () => {
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
    <Redirect to='/questions' />
  ) : (
    <Redirect to='/landing' />
  );
};

export default SplashPage;
