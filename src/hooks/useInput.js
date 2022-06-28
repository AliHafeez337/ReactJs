import { useCallback, useState } from "react";


const useInput = (validationFn) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationFn(value);
  const hasError = !isValid && isTouched;

  
  const valueInputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = useCallback(() => {
    setValue('');
    setIsTouched(false);
  }, []);

  return {
    value,
    isValid,
    hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset
  }
}

export default useInput;