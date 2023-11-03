import React, { useState } from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import loginImage from '../../assets/signup.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className='form-cl'>
      <img className='img-cl' src={loginImage} alt="login" width="150" /> 
      <div className='containerl'>   
        <h2 className='hl'>Sign In</h2>
        <form className='my-form' onSubmit={handleLogin}>
          <div>
            <input className='login-inp'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input className='login-inp'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button className='login-btn' type="submit">Login</button>
          <p className='pl3'> Forgot your password</p>
          <p className='pl1'> Don't have an account?</p>
          <Link to="/register" className='pl2'>Create Account</Link>
        </form>
      </div>  
    </div>
  );
};

export default Login;
