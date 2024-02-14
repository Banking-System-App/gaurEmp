import React, { useState }from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from '../components/HeaderFooter/Header';
import PrivateRoutes from '../utils/PrivateRoutes'
import Login from './Login';
import Signup from './Signup';
import About from './About';
import Home from '../components/Homee/Home';
import { AuthProvider } from '../utils/AuthContext';

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
import SalSheet from '../pdfs/SalSheet';
import Sidebar from '../components/HeaderFooter/Sidebar';

const Routess = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="container-fluid">
        <div className="row">
          <div className={`col-md-3 ${sidebarOpen ? 'open' : ''}`}>
            <button className="navbar-toggler d-md-none" type="button" onClick={toggleSidebar}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <Sidebar />
          </div>
          <div className="col-md-9">
            {/* <Route path="/get-employees" component={GetEmployeesPage} />
            <Route path="/add-employee" component={AddEmployeePage} /> */}
         

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
            <Route path="/generateslippdf" element = {<EmployerProvider><EmployeeProvider><SalSheet/></EmployeeProvider></EmployerProvider>}/>
            <Route path="" element={<userApi/>}/>
          </Route>
        </Routes>
        </div>
        </div>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default Routess;