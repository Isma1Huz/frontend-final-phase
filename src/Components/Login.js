import React, { useState } from 'react';
import '../login.css'
import loginImage from './WhatsApp_Image_2023-10-26_at_12.17.35-removebg-preview.png';

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
        <form onSubmit={handleLogin}>
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
          <p className='pl2'> Create now</p>
        </form>
      </div>  
    </div>
  );
};

export default Login;
