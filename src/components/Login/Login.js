import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import AuthContext from "../../store/auth-Context";

const defaultEmailState = {
  value: "",
  isValid: false,
};

const validateEmail = (email) => {
  return email.includes("@");
};

const emailReducerFunction = (oldState, action) => {
  if (action) {
    if (action.type === "INPUT") {
      return {
        value: action.value,
        isValid: validateEmail(action.value),
      };
    } else if (action.type === "BLUR") {
      return {
        value: oldState.value,
        isValid: validateEmail(oldState.value),
      };
    }
  }

  return defaultEmailState;
};

const defaultPasswordState = {
  value: "",
  isValid: false,
};

const validatePassword = (password) => {
  return password.trim().length > 6;
};

const passwordReducerFunction = (oldState, action) => {
  if (action) {
    if (action.type === "INPUT") {
      if (action.value === oldState.value) {
        return oldState;
      }
      return {
        value: action.value,
        isValid: validatePassword(action.value),
      };
    } else if (action.type === "BLUR") {
      return {
        value: oldState.value,
        isValid: validatePassword(oldState.value),
      };
    }
  }

  return defaultPasswordState;
};

const Login = () => {

  const emailInputRef = useRef()
    , passwordInputRef = useRef()
    ;

  const authCtx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [userEmail, setUserEmail] = useReducer(
    emailReducerFunction,
    defaultEmailState
  );

  const [userPassword, setUserPassword] = useReducer(
    passwordReducerFunction,
    defaultPasswordState
  );

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
      // console.log("Checking form validity!");
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);

    return () => {
      // console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    setUserEmail({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setUserPassword({
      value: event.target.value,
      type: "INPUT",
    });
  };

  const validateEmailHandler = () => {
    setUserEmail({
      type: "BLUR",
    });
  };

  const validatePasswordHandler = () => {
    setUserPassword({
      type: "BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.login(userEmail.value, userPassword.value);
    } else if (!userEmail.isValid) {
      emailInputRef.current.focus();
    } else if (!userPassword.isValid) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          label="Email"
          for="email" 
          type="email" 
          id="email" 
          value={userEmail.value} 
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={userEmail.isValid}
        />
        <Input 
          ref={passwordInputRef}
          label="Password"
          for="password" 
          type="password" 
          id="password" 
          value={userPassword.value} 
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={userPassword.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
