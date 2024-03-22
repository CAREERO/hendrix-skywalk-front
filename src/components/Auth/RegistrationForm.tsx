import React, { useState } from "react";
import { SHA256 } from "crypto-js";
import axios from "axios";
import classes from "./RegistrationForm.module.scss";

interface RegistrationFormProps {
  onRegister: (username: string, email: string, hashedPassword: string) => void;
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegister,
  onClose,
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Define the type of error explicitly
  const [loading, setLoading] = useState<boolean>(false);

  const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hashPassword = (password: string): string =>
    SHA256(password).toString();

  const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
    termsChecked: boolean;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      console.log("Sending registration request with data:", userData);

      const response = await axios.post(
        `http://54.146.118.222:8000/account/register/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Registration API error:", error);
      return {
        success: false,
        message: "Error during registration. Please try again.",
      };
    }
  };

  const handleRegister = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!isValidUsername(username)) {
        setError("Invalid username. Please enter a valid username.");
        return;
      }

      if (!isValidEmail(email)) {
        setError("Invalid email format.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const hashedPassword = hashPassword(password);

      const registrationResponse = await registerUser({
        username,
        email,
        password,
        termsChecked,
      });

      if (registrationResponse.success) {
        setError(null);
        onRegister(username, email, hashedPassword);

        onClose();
        setPassword("");
        setConfirmPassword("");
        console.log("Registration Successful");

        // Reload the page after a successful registration
        window.location.reload();
      } else {
        setError(
          registrationResponse.message ||
          "Registration Successful. You may close this window to login."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Username is already registered. Try a different one");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={classes.registrationFormContainer}>
      <h2>Register</h2>
      {loading && <p>Loading...</p>}
      {error && <p className={classes.errorMessage}>{error}</p>}
      <div className={classes.inputField}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={classes.checkboxField}>
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={termsChecked}
          onChange={() => setTermsChecked(!termsChecked)}
        />
        <label htmlFor="termsCheckbox">
          I agree to the{" "}
          <a
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>
        </label>
      </div>
      <button
        className={classes.registerButton}
        onClick={handleRegister}
        disabled={loading}
      >
        Register
      </button>
    </div>
  );
};

export default RegistrationForm;
