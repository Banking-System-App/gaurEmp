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
import { useCompanyData } from "../../context/CompanyContext";

import companyApis from "../../database/CompanyAPIs";
import { toast } from "react-toastify";

export default function CompanyList() {
  const { user } = useAuth();

  const { setCompanyDataValue } = useCompanyData();
  const navigate = useNavigate();

  const handleEmpDetailClick = (companyData) => {
    console.log("emps data is, ", companyData);
    setCompanyDataValue(companyData);
    navigate("/companyprofile");
  };
  const [companys, setCompanys] = useState([]);

  //::: TODO: Debug: Running Twice
  useEffect(() => {
    companyApis.getAllCompanyByUserId(user.$id).then((response) => {
      console.log("CompanyList:: List Of Employees", response);

      //In case of error: False is returned from API method
      if (response === false) {
        toast.error("Something went wrong !", {
          theme: "light",
          autoClose: 1000,
        });
      } else setCompanys(response.documents);
    });
  }, []);

  return (
    <MDBTable align="middle" className="table table-hover">
      <MDBTableHead>
        <tr>
          <th scope="col">Company ID</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">EMPCount</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {companys.map((emps, index) => (
          <tr
            key={index}
            onClick={() => handleEmpDetailClick(emps)}
            style={{ cursor: "pointer" }}
          >
            <td>
              <p className="fw-bold mb-1">{emps.company_id}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{emps.name}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{emps.company_address}</p>
            </td>
            <td>Senior</td>
            <td></td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
