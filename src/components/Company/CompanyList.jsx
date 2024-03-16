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
import DownBar from "../DownBar/DownBar";

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

  const [searchInput, setSearchInput] = useState("");
  const [filteredCompany, setFilteredCompany] = useState([]);



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
      } else{
         setCompanys(response.documents);
         setFilteredCompany(response.documents);
         //Set the first company in compnayContext, so that company context never remain empty([])
         setCompanyDataValue(response.documents[0])
      }
    });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
      setSearchInput(value);
      if (value.length > 0) {
        
         console.log("companys[0].company_code)",companys);
        const filtered = companys.filter((company) =>
       
          company.company_id.includes(value.toLowerCase()) ||
          company.company_code.toLowerCase().includes(value.toLowerCase().toString()) // Assuming emp_id is a number, convert to string for comparison
        );
        console.log("filtered ",filtered)
        setFilteredCompany(filtered);
       
      } else {
        // If search input is cleared, show all employees again
        setFilteredCompany(companys);
      }
   };
  return (
    <div>
    <MDBTable align="middle" className="table table-hover">
      <MDBTableHead>
      <input
    type="search"
    placeholder="Search by CompanyName or Company Code"
    onChange={handleSearch}
    value={searchInput}/>
    
        <tr  className="text-center">
          <th scope="col">S.N.</th>
          <th scope="col">Company Code</th>
          <th scope="col">Company Name</th>
          <th scope="col">Address</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredCompany.map((comp, index) => (
          <tr
            key={index}
            onClick={() => handleEmpDetailClick(comp)}
            style={{ cursor: "pointer" }}
            className="text-center"
          >
            <td>
              <p className="fw-bold mb-1">{index+1}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{comp.company_code}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{comp.name}</p>
            </td>
            <td>
              <p className="fw-bold mb-1">{comp.company_address}</p>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
    <DownBar/>
    </div>
  );
}
