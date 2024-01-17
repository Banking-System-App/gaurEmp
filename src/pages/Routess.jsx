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
import AddEmployeeForm from '../components/Employee/AddEmployee';
import AddEmployerForm from '../components/Employer/AddEmployer';
import EmployerProfile from '../components/Employer/EmployerProfile';
import EmployeesList from '../components/Employee/EmployeesList';
import EmployeeProfile from '../components/Employee/EmployeesProfile';
import EmpSalary from '../components/Salary/SalaryStructure';
import AddSalaryStructure from '../components/Salary/AddSalaryStructure';
import SalaryProcessEdit from '../components/Salary/SalaryProcessEdit';


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
            <Route path="/employerprofile" element={<EmployerProfile/>}/>
            <Route path="/addemployee" element={<AddEmployeeForm/>}/>
            <Route path="/viewemployees" element={<EmployeesList/>}/>
            <Route path="/employeeprofile" element={<EmployeeProfile/>}/>
      

            <Route path="/addemployer" element={<AddEmployerForm/>}/>
           
            <Route path="/salarystructure" element={<EmpSalary/>}/>
            <Route path="/salaryprocess" element={<SalaryProcessEdit/>}/>
            <Route path="/generateslippdf" element={<SalSheet/>}/>
            <Route path="/addsalarystructure" element={<AddSalaryStructure/>}/>

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