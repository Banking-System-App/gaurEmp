import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Header from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Addemp from './pages/Addemp';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/employees/:compName" element={<Addemp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
