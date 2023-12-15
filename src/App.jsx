import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';

import PrivateRoutes from './utils/PrivateRoutes'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    // <div className="App">
    //   <SignInOutContainer/>
    // </div>
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />

          {/* <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> */}

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>


        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
