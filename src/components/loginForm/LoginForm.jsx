import React, {useState} from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault()
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
      }

    } catch (error) {
      console.error(error);
      // Handle login error
    }

    
  }

  return (
    <div className="login-body">
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type="text" placeholder='Username' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <FaUser className='icon'/>
          </div>

          <div className='input-box'>
            <input type="password" placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
    </div>
  )
};

export default LoginForm;
