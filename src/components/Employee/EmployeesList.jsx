import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useEmployeeData } from "../../context/EmployeeContext";
import { useCompanyData } from "../../context/CompanyContext";
import employeeApis from "../../database/EmployeeAPIs";
import { toast } from "react-toastify";

export default function EmployeesList() {
  const { CompanyDetails } = useCompanyData();
  const { setEmployeeDataValue } = useEmployeeData();

  const [employees, setEmployees] = useState([]);

  //TODO: Do war chal rha hai
  useEffect(() => {
    employeeApis
      .getAllEmployeesByCompanyId(CompanyDetails.company_id)
      .then((response) => {
        if (response === false) {
          toast.error("Fetching Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else setEmployees(response.documents);
      });
  }, []);

  const navigate = useNavigate();

  const handleClick = (Employee) => {
    console.log("Employee from employee list is: ", Employee);
    setEmployeeDataValue(Employee);
    navigate("/employeeprofile");
  };

  return (
    <MDBTable align="middle" hover>
      <MDBTableHead>
        <tr>
          <th scope="col">EmpID</th>
          <th scope="col">EmpName</th>
          <th scope="col">EmployeEmail</th>
          <th scope="col">Aadhar</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {employees.map((employee, index) => (
          <tr key={index} onClick={() => handleClick(employee)}>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">{employee.emp_id}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">{employee.emp_name}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{employee.emp_email}</p>
            </td>
            <td>
              <p className="fw-normal mb-1">{employee.Aadhar}</p>
            </td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Edit
              </MDBBtn>
            </td>
          </tr>
        ))}
        <tr></tr>
      </MDBTableBody>
    </MDBTable>
  );
}
