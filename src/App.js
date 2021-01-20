import firebase from 'firebase/app';
import firebaseConfig from './config/firebase';

const App = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <div>
      <h1>Oii</h1>
    </div>
  );
};

export default App;
