import Rebase from 're-base';
import fb from 'firebase';

const app = fb.initializeApp({
  apiKey: 'AIzaSyAyyzDIce-H2w2ip_fVIKmrjd0uZ6ToyjY',
  authDomain: 'keith-test-174622.firebaseapp.com',
  databaseURL: 'https://keith-test-174622.firebaseio.com',
  projectId: 'keith-test-174622',
  storageBucket: 'keith-test-174622.appspot.com',
  messagingSenderId: '787091493416'
});

const firebase = Rebase.createClass(app.database());

export default firebase;
