import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

import AuthContext from '../../store/auth-Context';


const defaultEmailState = {
  value: '',
  isValid: true
}

const validateEmail = email => {
  return email.includes('@');
}

const emailReducerFunction = (oldState, action) => {
  console.log('oldEmailState', oldState, 'action-type', action);
  if (action) {
    if (action.type === 'INPUT') {
      return {
        value: action.value,
        isValid: validateEmail(action.value)
      }
    } else if (action.type === 'BLUR') {
      return {
        value: oldState.value,
        isValid: validateEmail(oldState.value)
      }
    }
  }

  return defaultEmailState;
}

const defaultPasswordState = {
  value: '',
  isValid: true
}

const validatePassword = password => {
  return password.trim().length > 6;
}

const passwordReducerFunction = (oldState, action) => {
  console.log('oldPasswordState', oldState, 'action-type', action);
  if (action) {
    if (action.type === 'INPUT') {
      if (action.value === oldState.value) {
        return oldState;
      }
      return {
        value: action.value,
        isValid: validatePassword(action.value)
      }
    } else if (action.type === 'BLUR') {
      return {
        value: oldState.value,
        isValid: validatePassword(oldState.value)
      }
    }
  }

  return defaultPasswordState;
}

const Login = () => {

  const authCtx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [userEmail, setUserEmail] = useReducer(
    emailReducerFunction,
    defaultEmailState
  );

  const [userPassword, setUserPassword] = useReducer(
    passwordReducerFunction,
    defaultPasswordState
  );

  useEffect(() => {
    console.log('userEmail', userEmail)
  }, [userEmail])

  useEffect(() => {
    console.log('userPassword', userPassword)
  }, [userPassword])

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  /**
   * Below lines are destructuring object (userEmail) and assigning an alias (ref) to isValid property/key so that we can listen to these specific property
   */
  const { isValid: isEmailValid } = userEmail;
  const { isValid: isPasswordValid } = userPassword;

  /**
   * 
   * "DEBOUNCING"
   * the cleanup function will run before the actual useEffect runs
   * in cleanup, we clear the old timer
   * after user stops for 500ms, the callback inside timer will run that will perform resouce intensive task
   * 
   */
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    setUserEmail({
      type: 'INPUT',
      value: event.target.value
    });

    // setFormIsValid(
    //   validateEmail(event.target.value) && validatePassword(enteredPassword)
    // );
    // setFormIsValid(
    //   validateEmail(event.target.value) && validatePassword(userPassword.value)
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    setUserPassword({
      value: event.target.value,
      type: 'INPUT'
    })

    // setFormIsValid(
    //   validateEmail(enteredEmail) && validatePassword(event.target.value)
    // );
    // setFormIsValid(
    //   validateEmail(userEmail.value) && validatePassword(event.target.value)
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(validateEmail(enteredEmail));
    setUserEmail({
      type: 'BLUR'
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(validatePassword(enteredPassword));
    setUserPassword({
      type: 'BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.login(userEmail.value, userPassword.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            userEmail.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={userEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            userPassword.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userPassword.value}
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
