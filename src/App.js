import logo from './logo.svg';
import React from 'react';
import { auth } from './firebase/init'
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut,
 } from "firebase/auth";


function App() {
  const [user, setUser] = React.useState({});

    React.useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          setUser(user)
        }
      })
    }, []); 

  function register() {
    console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(({ user }) => {
      console.log(user)
      setUser(user)
    })
      .catch((error) => {
        console.log(error);
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
      .catch((error) => {
        
        console.log(error.message);
      })
  }
  
  function logout() {
    signOut(auth);
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {user.email}
    </div>
  );
}

export default App; 
