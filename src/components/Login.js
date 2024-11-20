import React, { useState } from 'react';
import '../css/Login.css';

const Login = ({ onLogin, onRegister }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState(''); // Only needed for sign-up
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        setUsername(name)
        setPassword(password)
        // Call registration function if in sign-up mode
        await onRegister({ name, email, password });
        console.log('Sign up with', { name, email, password });
      } else {
        setUsername(email)
        setPassword(password)
        // Call login function if in login mode
        await onLogin({ email, password });
        console.log('Log in with', { email, password });
      }
    } catch (err) {
      setError(err.message);
    }
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
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
      
      {/* Show error message if error occurs */}
      {error && <div className="error">{error}</div>}

      <p onClick={() => {
        setIsSignUp(!isSignUp);
        setError(null);
      }}>
        {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default Login;
