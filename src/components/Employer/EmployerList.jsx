import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useEmployerData } from "../../context/EmployerContext";

import employerApis from "../../database/EmployerAPIs";
import { toast } from "react-toastify";

export default function EmployerList() {
  const { user } = useAuth();

  const { setEmployerDataValue } = useEmployerData();
  const navigate = useNavigate();

  const handleEmpDetailClick = (employerData) => {
    console.log("emps data is, ", employerData);
    setEmployerDataValue(employerData);
    navigate("/employerprofile");
  };
  const [employers, setEmployers] = useState([]);
  
  //::: TODO: Debug: Running Twice
  useEffect(() => {
    employerApis.getAllEmployerByUserId(user.$id).then((response) => {
      console.log("EmployerList:: List Of Employees", response);

      //In case of error: False is returned from API method
      if (response === false) {
        toast.error("Something went wrong !", {
          theme: "light",
          autoClose: 1000,
        });
      } else setEmployers(response.documents);
    });

  }, []);

  return (
    <MDBTable align="middle" className="table table-hover">
      <MDBTableHead>
        <tr>
          <th scope="col">Employer ID</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">EMPCount</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {employers.map((emps, index) => (
          <tr
            key={index}
            onClick={() => handleEmpDetailClick(emps)}
            style={{ cursor: "pointer" }}
          >
            <td>
              <p className="fw-bold mb-1">{emps.employer_id}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{emps.name}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{emps.employer_address}</p>
            </td>
            <td>Senior</td>
            <td></td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
