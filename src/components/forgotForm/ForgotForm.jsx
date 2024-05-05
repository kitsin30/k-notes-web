import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ForgotForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleForgot = async (e) => {

    e.preventDefault();
    console.log(username);

    try {
      const response = await fetch('http://localhost:8080/user/findbyid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if(data.status === 200){
        localStorage.setItem('username', JSON.stringify(data.obj.username));
        localStorage.setItem('userId', JSON.stringify(data.obj.id));
        navigate("/home");
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
        <form onSubmit={handleForgot}>
          <h1>Forgot Password</h1>
          <div className='input-box'>
            <input type="text" placeholder='Username' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <FaUser className='icon'/>
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
    </div>
  )
}

export default ForgotForm;
