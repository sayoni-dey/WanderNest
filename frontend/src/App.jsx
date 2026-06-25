import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/LandingPage/Landing';

// Placeholder view for home dashboard route
const HomePlaceholder = () => (
  <div className="p-8 font-sans">
    <h1 className="text-2xl font-bold">Welcome to WanderNest Home Dashboard</h1>
    <p className="text-gray-600">Authentication was completed successfully!</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
