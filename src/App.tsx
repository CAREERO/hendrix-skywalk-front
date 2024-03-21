// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { CartProvider } from '../src/components/Shop/CartContext';
import './styles/global.scss';

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Hendrix.World"; // Set your desired title here
  }, []); // This effect runs only once, on component mount

  return (
    <Router>
      <CartProvider>
        <Routes />
      </CartProvider>
    </Router>
  );
};

export default App;
