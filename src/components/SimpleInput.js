// import { useCallback, useState } from 'react';

// import EmailInput from './EmailInput';

import useInput from '../hooks/useInput';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput(enteredName => enteredName.trim() !== '');

  
  const emailValidationFn = enteredEmail => {
    if (
      enteredEmail
      && enteredEmail.trim()
      && enteredEmail.trim().includes('@')
    ) {
      return true;
    }
    return false;
  }
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput(emailValidationFn);

  let formIsValid = false;

  if (
    enteredNameIsValid
    && enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log('submitting', enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='text'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className='error-text'>Email is invalid.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
