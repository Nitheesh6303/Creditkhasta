// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CreditProvider } from './context/CreditContext';
import DashboardPage from './pages/DashboardPage';
import CustomerPage from './pages/CustomerPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Layout/Header';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <CreditProvider>
        <Router>
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/customers/:id" element={<CustomerPage />} />
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/signup" element={<AuthPage type="signup" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </Router>
      </CreditProvider>
    </AuthProvider>
  );
}

export default App;