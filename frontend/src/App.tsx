import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from '@/shared/router';
import { AuthProvider } from './shared/providers/AuthProvider';
import { CartProvider } from './shared/providers/CartProvider';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
