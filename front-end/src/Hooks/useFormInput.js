import { useState, useEffect } from 'react';

const useFormInput = (initialValue, validationRegex) => {
  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  useEffect(() => {
    setValid(validationRegex.test(value));
  }, [value, validationRegex]);

  return {
    value,
    valid,
    focus,
    handleChange,
    handleFocus,
    handleBlur, 
  };
};

export default useFormInput;
