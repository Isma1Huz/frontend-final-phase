import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import registerImage from '../../assets/login.png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`
      First Name: ${firstName}
      Last Name: ${lastName}
      Username: ${username}
      Email: ${email}
      Confirm Email: ${confirmEmail}
      Password: ${password}
    `);
  };

  return (
    <div className='form-c'>
      <div className='containerR'>   
        <h2 className='h2reg'>Sign Up</h2>
        <form className='my-rform' onSubmit={handleRegister}>
          <div>
            <input className='register-inp'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input className='register-inp'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <input className='register-inp'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input className='register-inp'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input className='register-inp'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input className='register-inp'
              type="password"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          <button className='register-btn' type="submit">Sign Up</button>
          <p className='pl1'> Existing User?</p>
          <Link to="/login" className='pl2'>Sign In</Link>

        </form>
      </div>  
      <img className='img-c' src={registerImage} alt="register" /> 

    </div>
  );
};

export default Register;
