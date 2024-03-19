// LoginPage.tsx

import React, { useState } from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import RegistrationForm from '../../components/Auth/RegistrationForm';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Your login logic here
      console.log('Login successful');
      onLogin(username, password); // Call the onLogin prop
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      // Your registration logic here
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, display a message, etc.
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      {showRegistrationForm && (
        <RegistrationForm onRegister={handleRegister} onClose={() => setShowRegistrationForm(false)} />
      )}
    </div>
  );
};

export default LoginPage;
