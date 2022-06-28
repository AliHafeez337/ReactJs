import { useEffect, useState } from "react";


const EmailInput = props => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  let isEmailValid = false;
  if (
    enteredEmail
    && enteredEmail.trim()
    && enteredEmail.trim().includes('@')
  ) {
    isEmailValid = true;
  }

  let isInputValid = true;
  if(
    (
      !isEmailValid
      && isEmailTouched
    )
  ) {
    isInputValid = false;
  }

  useEffect(() => {
    props.onChange({
      value: enteredEmail,
      isValid: isEmailValid
    })
  }, [enteredEmail, isEmailValid])

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  }

  const emailInputBlurHandler = () => {
    setIsEmailTouched(true);
  }

  const inputClasses = isInputValid
    ? 'form-control'
    : 'form-control invalid';

  return (
    <div className={inputClasses}>
      <label htmlFor='email'>Your Email</label>
      <input
        type='text'
        id='email'
        onChange={emailInputChangeHandler}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}
      />
      {!isInputValid && (
        <p className='error-text'>Email is invalid.</p>
      )}
    </div>
  )
}

export default EmailInput;