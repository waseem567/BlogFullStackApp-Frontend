import { useState } from 'react';

const useValidation = () => {
    const [error, setError] = useState({
        image: '',
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    

  const validateUser = (user,  image, type) => {
    // Reset errors
    setError({
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    if(type=== "signup"){
 // Image validation
 if (!image) {
    setError((prev) => ({ ...prev, image: 'Image is required!' }));
    return false;
  }

  // Username validation
  if (user.username === '') {
    setError((prev) => ({ ...prev, username: 'Username is required!' }));
    return false;
  }

  // Name validation
  if (user.name === '') {
    setError((prev) => ({ ...prev, name: 'Name is required!' }));
    return false;
  }

  // Email validation
  if (user.email === '') {
    setError((prev) => ({ ...prev, email: 'Email is required!' }));
    return false;
  }

  // Password validation
  if (user.password === '') {
    setError((prev) => ({ ...prev, password: 'Password is required!' }));
    return false;
  }
  // Password validation
  if (user.password.length < 6 || !/[a-zA-Z]/.test(user.password) || !/\d/.test(user.password)) {
    setError((prev) => ({ ...prev, password: 'Password must be >= 6 and contain numbers and letters!' }));
    return false;
  }

  // Confirm password validation
  if (user.confirmPassword === '') {
    setError((prev) => ({
      ...prev,
      confirmPassword: 'Confirm Password is required!',
    }));
    return false;
  }

  // Password match validation
  if (user.password !== user.confirmPassword) {
    setError((prev) => ({
      ...prev,
      confirmPassword: 'Confirm Password does not match!',
    }));
    return false;
  }

  

  // Username format validation
  if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(user.username)) {
    setError((prev) => ({ ...prev, username: 'Username is not valid' }));
    return false;
  }

    }else{
        // Email validation
    if (user.email === '') {
        setError((prev) => ({ ...prev, email: 'Email is required!' }));
        return false;
      }  
       // Password match validation
  if (user.password === '') {
    setError((prev) => ({
      ...prev,
      password: 'Password is required!',
    }));
    return false;
  }
   // Password validation
   if (user.password.length < 6 || !/[a-zA-Z]/.test(user.password) || !/\d/.test(user.password)) {
    setError((prev) => ({ ...prev, password: 'Password must be >= 6 and contain numbers and letters!' }));
    return false;
  }
    
    }
   
    // All validations passed
    return true;
  };

  return { error, validateUser };
};

export default useValidation;
