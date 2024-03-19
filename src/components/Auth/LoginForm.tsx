import React, { useState } from "react";
import classes from "./LoginForm.module.scss"; // Update the import path
import axios from "axios";
import RegistrationForm from "../Auth/RegistrationForm";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: (username: string, password: string, accessToken: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const setAuthHeader = (token: string) => {
    // Set the token in the headers for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleLogin = async () => {
    try {
      console.log("Username:", username);
      console.log("Password:", password);
      const response = await axios.post(
        `${process.env.REACT_APP_API_TARGET}/account/login/`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response.data);

      if (response.data.access) {
        setError(null);
        onLogin(username, password, response.data.access);

        // Store user info and token in localStorage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("accessToken", response.data.token); //token

        setAuthHeader(response.data.access);

        setLoginSuccess(true);
        navigate("/");
      } else {
        setError("User not found. Please register an account.");
        setLoginSuccess(false);
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      setError("Error during login. Please try again.");
      setLoginSuccess(false);
      return {
        success: false,
        message: "Error during login. Please try again.",
      };
    }
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
    setError(null);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegistration = () => {
    closeRegisterModal();
  };

  return (
    <div className={classes.loginFormContainer}>
      <h2>Login</h2>
      {error && <p className={classes.errorMessage}>{error}</p>}
      {loginSuccess && (
        <p className={classes.successMessage}>
          Login successful! Redirecting...
        </p>
      )}
      <div className={classes.inputField}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={classes.inputField}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={classes.buttonContainer}>
        <button className={classes.loginButton} onClick={handleLogin}>
          Login
        </button>
        <button
          className={classes.registerButton}
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </div>

      {isRegisterModalOpen && (
        <div className={`${classes.registerModalOverlay} ${classes.active}`}>
          <div className={classes.registerModalContainer}>
            <span
              className={classes.closeModalButton}
              onClick={closeRegisterModal}
            >
              &times; Close
            </span>
            <RegistrationForm onClose={closeRegisterModal} onRegister={handleRegistration} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
