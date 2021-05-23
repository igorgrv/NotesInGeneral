import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') return { value: action.val, isValid: action.val.includes('@') };
  if (action.type === 'INPUT_BLUR') return { value: prevState.value, isValid: prevState.value.includes('@') };
  return { value: '', isValid: false };
};

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') return { value: action.val, isValid: action.val.trim().length > 6 };
  if (action.type === 'INPUT_BLUR') return { value: prevState.value, isValid: prevState.value.trim().length > 6 };
  return { value: '', isValid: false };
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: undefined });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = emailState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('irá rodar a cada vez que for pausado');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(timer);
      console.log('Irá rodar a todo momento');
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR', val: emailReducer.isValid });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR', val: passwordReducer.isValid });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailReducer.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
