import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import './loginTheme.css';   // ⭐ NEW THEME CSS

const LoginPage = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

 const validateLogin = (e) => {
  e.preventDefault();
  setApiError(""); // clear old error
  validateUser(loginData.username, loginData.password)
    .then((response) => {
      let role = String(response.data);
      if (role === "Admin") navigate('/AdminMenu');
      else if (role === "Student") navigate('/StudentMenu');
      else setApiError("Invalid username or password");
    })
    .catch(() => setApiError("Login failed. Please try again."));
};

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setLoginData(values => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) validateLogin(event);
  };

  const registerNewUser = () => {
    navigate('/Register');
  };

  return (
    <div className="login-page">
      
      {/* Navbar */}
      <div className="top-nav">
        <div className="logo">Lost<span>Found</span></div>
      </div>

      <h1 className="login-title">Log in to your account</h1>

      <div className="login-card">
        <form>
          <label>Email</label>
          <input
            placeholder="Enter username"
            name="username"
            value={loginData.username}
            onChange={onChangeHandler}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={onChangeHandler}
          />
          {/* {errors.password && <p className="error-text">{errors.password}</p>} */}
          {apiError && <p className="error-text">{apiError}</p>}

          <button className="btn-primary" onClick={handleValidation}>
            Log In
          </button>

          <p className="forgot-text">Forgot password?</p>
        </form>
      </div>

      <p className="register-text">
        Don’t have an account?
        <span className="signup-link" onClick={registerNewUser}> Sign Up</span>
      </p>
    </div>
  );
};

export default LoginPage;