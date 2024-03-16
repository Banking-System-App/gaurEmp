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

  const [searchInput, setSearchInput] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

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
        } else {
          console.log("response.documents",response.documents);
          setEmployees(response.documents);
          setFilteredEmployees(response.documents);

        }

      });
  }, [CompanyDetails.company_id]);

  const navigate = useNavigate();

  const handleClick = (Employee) => {
    console.log("Employee from employee list is: ", Employee);
    setEmployeeDataValue(Employee);
    console.log("emloyee data",Employee);
    navigate("/employeeprofile");
  };
  const handleAddEmployeeClick = () => {
    navigate("/addemployee");
  };
 const handleSearch = (e) => {
  const value = e.target.value;
    setSearchInput(value);
    if (value.length > 0) {
      const filtered = employees.filter((employee) =>
     
        employee.emp_name.toLowerCase().includes(value.toLowerCase()) ||
        employee.emp_id.toString().includes(value) // Assuming emp_id is a number, convert to string for comparison
       
      );
      setFilteredEmployees(filtered);
      console.log("filtered",filtered);
    } else {
      // If search input is cleared, show all employees again
      setFilteredEmployees(employees);
    }
 };
  return (
    <div>
    <div className="d-flex justify-content-between mb-3">
      <input
        type="search"
        placeholder="Search by Employee Name or EmployeeID"
        className="form-control rounded-2"
        onChange={handleSearch}
        value={searchInput}
        style={{ maxWidth: '350px' }} // Adjust the width of the search input as needed
      />
      <MDBBtn className="me-8" variant="success" size="lg" onClick={handleAddEmployeeClick}>
        Add Employee
      </MDBBtn>
    </div>
    <MDBTable align="middle" hover>
      <MDBTableHead>
        <tr>
        <th scope="col">S.N.</th>
          <th scope="col">EmpID</th>
          <th scope="col">EmpName</th>
          <th scope="col">EmployeEmail</th>
          <th scope="col">Aadhar</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredEmployees.map((employee, index) => (
          <tr key={index} onClick={() => handleClick(employee)}>
            {/* <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />

                 <td>
              <p className="fw-bold mb-1">{index+1}</p>
            </td>

                <div className="ms-3">
                  <p className="fw-bold mb-1">{employee.emp_id}</p>
                </div>
              </div>
            </td> */}
             <td>
              <p className="fw-bold mb-1">{index+1}</p>
            </td>
            <td>
                  <p className="fw-bold mb-1">{employee.emp_id}</p>
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
      </MDBTableBody>
    </MDBTable>
  </div>
  );
}
