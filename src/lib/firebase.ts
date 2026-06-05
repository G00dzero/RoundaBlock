import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAfUv0m9P29mY0Zj4dq6VAQc42DOLDXFAQ',
  authDomain: 'roundablock-1.firebaseapp.com',
  databaseURL: 'https://roundablock-1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'roundablock-1',
  storageBucket: 'roundablock-1.firebasestorage.app',
  messagingSenderId: '1018599446374',
  appId: '1:1018599446374:web:60c3c25e1521a30e875aa7',
  measurementId: 'G-L443VQFSEG',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export { firebaseConfig };