import Bugsnag from '@bugsnag/js';
import { useEffect, useState } from 'react';
import * as AuthUtils from './../utils/auth';

const useFirebaseUser = (uid = AuthUtils.getCurrentUser().uid) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AuthUtils.getUserFromFirebase(uid)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        Bugsnag.notify(error);
        setError(error);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [uid]);

  return { loading, user, error };
};

export default useFirebaseUser;
