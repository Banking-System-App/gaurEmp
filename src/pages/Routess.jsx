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
import { EmployerProvider } from '../context/EmployerContext';
import { EmployeeProvider } from '../context/EmployeeContext';

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
            <Route path="/addemployer" element={<AddEmployerForm/>}/>
            <Route path="/getcompany" element={<EmployerProvider><EmployerList/></EmployerProvider>}/>
            <Route path="/employerprofile" element={<EmployerProvider><EmployerProfile/></EmployerProvider>}/>
            <Route path="/addemployee" element={<EmployerProvider><AddEmployeeForm/></EmployerProvider>}/>
            <Route path="/viewemployees" element={<EmployerProvider><EmployeeProvider><EmployeesList/></EmployeeProvider></EmployerProvider>}/>
            <Route path="/employeeprofile" element={<EmployerProvider><EmployeeProvider><EmployeeProfile/></EmployeeProvider></EmployerProvider>}/>
            <Route path="/salarystructure" element={<EmployerProvider><EmployeeProvider><EmpSalary/></EmployeeProvider></EmployerProvider>}/>
            <Route path="/addsalarystructure" element={<EmployerProvider><EmployeeProvider><AddSalaryStructure/></EmployeeProvider></EmployerProvider>}/>
            <Route path="/salaryprocess" element={<EmployerProvider><EmployeeProvider><SalaryProcessEdit/></EmployeeProvider></EmployerProvider>}/>
            <Route path="/generateslippdf" element={<SalSheet/>}/>
            

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