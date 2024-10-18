import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importing CSS for styling

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const email = useRef(null);
  const password = useRef(null);
  const smallsEmail = useRef(null);
  const smallsPass = useRef(null);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const staticUsername = 'Excelr@gmail.com';
      const staticPassword = 'password123';

      if (formValue.email === staticUsername && formValue.password === staticPassword) {
        onLogin(true);
        navigate('/employee-form');
      } else {
        navigate('/login-failed');
      }
    }
  };

  const validateInputs = () => {
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();

    if (!isValidEmail(emailValue)) {
      setErrorFor(email, 'Invalid email format', smallsEmail.current);
      return false;
    } else if (!isValidPassword(passwordValue)) {
      setErrorFor(password, 'Invalid password', smallsPass.current);
      return false;
    } else {
      return true;
    }
  };

  const setErrorFor = (input, message, small) => {
    const formControl = input.current.parentElement;
    formControl.classList.add('form-error');
    small.textContent = message;
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 8;

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            ref={email}
            onChange={handleChange}
            className="form-input"
          />
          <small ref={smallsEmail}></small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            ref={password}
            onChange={handleChange}
            className="form-input"
          />
          <small ref={smallsPass}></small>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
