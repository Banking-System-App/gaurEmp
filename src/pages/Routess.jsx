import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from '../components/HeaderFooter/Header';
import PrivateRoutes from '../utils/PrivateRoutes'
import Login from './Login';
import Signup from './Signup';
import About from './About';
import Home from '../components/Homee/Home';
import { AuthProvider } from '../utils/AuthContext';
import SalSheet from '../pdfs/SalSheet';
import EmployerList from '../components/Employer/EmployerList';
import Contact from './Contact';

const Routess = () => {

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/getcompany" element={<EmployerList/>}/>
            {/* <Route path="/profile" element={<Profile />}/>
            <Route path="/employees/:compName" element={<Addemp />} /> */}
            <Route path="/genpdf/:compName" element = {<SalSheet/>}/>
            <Route path="" element={<userApi/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default Routess;