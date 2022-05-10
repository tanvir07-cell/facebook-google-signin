import logo from "./logo.svg";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./App.css";
import app from "./firebase.init";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  const handleSingOut = () => {
    signOut(auth)
      .then((result) => {
        const user = result?.user;
        setUser({});
        console.log(user);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleSingOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>
            <FaGoogle></FaGoogle> signIn
          </button>

          <button onClick={handleFacebookSignIn}>
            <FaFacebook></FaFacebook> signIn
          </button>
        </>
      )}

      <h1>Name : {user.displayName}</h1>
      <p>Email : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
