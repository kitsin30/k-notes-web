import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Login</h1>
        <div className='input-box'>
          <input type="text" placeholder='Username' name="" id="" required />
          <FaUser className='icon'/>
        </div>

        <div className='input-box'>
          <input type="password" placeholder='Password' name="" id="" required />
          <FaLock className='icon'/>
        </div>

        <div className='forgot-password'>
          <a href="/">Forgot Password?</a>
        </div>

        <div className='button-submit'>
        <button type='submit'>Login</button>
        </div>

        <div className="register-acc">
          <p>Don't have an account? <a href="/">Register Here</a></p>
        </div>

      </form>
    </div>
  )
};

export default LoginForm;
