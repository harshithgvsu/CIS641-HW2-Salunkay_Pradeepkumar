import React, { useState } from 'react';
import '../css/Login.css';

const Login = ({ onLogin, onRegister }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await onRegister({ name, email, password });
      } else {
        await onLogin({ email, password });
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
            onChange={(e) => setName(e.target.value)}
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

      {/* Show error message if there's an error */}
      {error && <div className="error">{error}</div>}

      <p
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError(null);
        }}
      >
        {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default Login;
