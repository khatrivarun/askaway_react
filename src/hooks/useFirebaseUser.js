import { useEffect, useState } from 'react';
import * as AuthUtils from './../utils/auth';

const useFirebaseUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = AuthUtils.getCurrentUser();

    AuthUtils.getUserFromFirebase(user.uid)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  return { loading, user, error };
};

export default useFirebaseUser;
