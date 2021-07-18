import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailEntered = useRef(null);
  const passwordEntered = useRef(null);

  const history = useHistory()
  const authContext = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = emailEntered.current.value;
    const password = passwordEntered.current.value;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXxEEL5PZ9fZnQHfcVqF61rzPxs5f3uR4';
    if (isLogin)
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXxEEL5PZ9fZnQHfcVqF61rzPxs5f3uR4';

    axios
      .post(url, { email, password, returnSecureToken: true })
      .then((res) => {
        setIsLoading(false);
        console.log(JSON.stringify(res.data));
        authContext.login(res.data.idToken);
        history.replace("/")
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err.response.data));
        alert(err.response.data.error.errors[0].message)
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailEntered} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordEntered} />
        </div>
        <div className={classes.actions}>
          {!isLoading ? <button>{isLogin ? 'Login' : 'Create Account'}</button> : 'Sending Request....'}
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
