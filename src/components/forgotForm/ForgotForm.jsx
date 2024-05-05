import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../loginForm/LoginForm.css';
import './ForgotForm.css';

const ForgotForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleForgot = async (e) => {

    e.preventDefault();

    if(confirmpassword === password){
      try {
        const response = await fetch('http://localhost:8080/user/updatepassword', {
          method: 'PUT',
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
    } else {
      alert("Password and Confirm Password doesn't match");
      setPassword('');
      setConfirmPassword('');
    }

    
  }

  return (
    <div className="login-body">
      <div className='wrapper'>
        <form onSubmit={handleForgot}>
          <h1>Forgot Password</h1>
          <div className='input-box-forgot'>
            <input type="text" placeholder='Username' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <FaUser className='icon'/>
          </div>

          <div className='input-box-forgot'>
            <input type="password" placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <FaLock className='icon'/>
          </div>

          <div className='input-box-forgot'>
            <input type="password" placeholder='Confirm Password' id="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <FaLock className='icon'/>
          </div>

          {/* <div className='forgot-password'>
            <a href="/">Forgot Password?</a>
          </div> */}

          <div className='button-submit'>
            <button type='submit'>Update Password</button>
          </div>

          <div className="register-acc">
            <p><a href="/">Here to Login page</a></p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ForgotForm;
