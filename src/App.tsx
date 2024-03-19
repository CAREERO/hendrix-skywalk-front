// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { CartProvider } from '../src/components/Shop/CartContext';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Routes />
      </CartProvider>
    </Router>
  );
};

export default App;
