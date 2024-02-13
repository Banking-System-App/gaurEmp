import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/HeaderFooter/Header";
import PrivateRoutes from "../utils/PrivateRoutes";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import Home from "../components/Homee/Home";
import { AuthProvider } from "../utils/AuthContext";

import CompanyList from "../components/Company/CompanyList";
import Contact from "./Contact";
import AddEmployeeForm from "../components/Employee/AddEmployee";
import AddCompanyForm from "../components/Company/AddCompany";
import CompanyProfile from "../components/Company/CompanyProfile";
import EmployeesList from "../components/Employee/EmployeesList";
import EmployeeProfile from "../components/Employee/EmployeesProfile";
import EmpSalary from "../components/Salary/SalaryStructure";
import AddSalaryStructure from "../components/Salary/AddSalaryStructure";
import SalaryProcessEdit from "../components/Salary/SalaryProcessEdit";
import { CompanyProvider } from "../context/CompanyContext";
import { EmployeeProvider } from "../context/EmployeeContext";
import SalSheet from "../pdfs/SalSheet";

import "../components/HeaderFooter/Sidebar.css"; // Import your custom CSS file for styling
import { ToastContainer } from "react-toastify";

const Routess = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/addcompany" element={<AddCompanyForm />} />
            <Route
              path="/getcompany"
              element={
                <CompanyProvider>
                  <CompanyList />
                </CompanyProvider>
              }
            />
            <Route
              path="/companyprofile"
              element={
                <CompanyProvider>
                  <CompanyProfile />
                </CompanyProvider>
              }
            />
            <Route
              path="/addemployee"
              element={
                <CompanyProvider>
                  <AddEmployeeForm />
                </CompanyProvider>
              }
            />
            <Route
              path="/viewemployees"
              element={
                <CompanyProvider>
                  <EmployeeProvider>
                    <EmployeesList />
                  </EmployeeProvider>
                </CompanyProvider>
              }
            />
            <Route
              path="/employeeprofile"
              element={
                <CompanyProvider>
                  <EmployeeProvider>
                    <EmployeeProfile />
                  </EmployeeProvider>
                </CompanyProvider>
              }
            />
            <Route
              path="/salarystructure"
              element={
                <CompanyProvider>
                  <EmployeeProvider>
                    <EmpSalary />
                  </EmployeeProvider>
                </CompanyProvider>
              }
            />
            <Route
              path="/addsalarystructure"
              element={
                <CompanyProvider>
                  <EmployeeProvider>
                    <AddSalaryStructure />
                  </EmployeeProvider>
                </CompanyProvider>
              }
            />
            <Route
              path="/salaryprocess"
              element={
                <CompanyProvider>
                  <EmployeeProvider>
                    <SalaryProcessEdit />
                  </EmployeeProvider>
                </CompanyProvider>
              }
            />
            <Route
              path="/generateslippdf"
              element={
                <CompanyProvider>
                  <EmployeeProvider>
                    <SalSheet />
                  </EmployeeProvider>
                </CompanyProvider>
              }
            />
            <Route path="" element={<userApi />} />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </Router>
  );
};

export default Routess;
