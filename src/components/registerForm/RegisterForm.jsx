import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../loginForm/LoginForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      // console.log(data);

      if(data.status === 200){
        navigate("/");
        alert(data.msg);
        console.log("true");
        
      } else{
        console.log("false");
        alert(data.msg);
      }

    } catch (error) {
      console.error(error);
      alert(error);
    }

    
  }

  return (
    <div className="login-body">
      <div className='wrapper'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className='input-box'>
            <input type="text" placeholder='Username' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <FaUser className='icon'/>
          </div>

          <div className='input-box'>
            <input type="password" placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <FaLock className='icon'/>
          </div>

          <div className='forgot-password'>
            <a href="/forgot">Forgot Password?</a>
          </div>

          <div className='button-submit'>
            <button type='submit'>Register</button>
          </div>

          <div className="register-acc">
            <p>Already have an account? <a href="/">Login Here</a></p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterForm;
