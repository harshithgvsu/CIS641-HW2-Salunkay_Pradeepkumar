import React, { useState } from 'react';
import '../css/Login.css';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only needed for sign-up

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Perform signup logic
      console.log('Sign up with', { name, email, password });
    } else {
      // Perform login logic
      console.log('Log in with', { email, password });
    }
    onLogin(); // Call parent function to handle login state
  };

  return (
    <div className="loginContainer">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value='abc@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value='123'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default Login;
