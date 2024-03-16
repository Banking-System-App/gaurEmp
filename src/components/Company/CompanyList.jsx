import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Table, Form } from "react-bootstrap";
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
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  useEffect(() => {
    companyApis.getAllCompanyByUserId(user.$id).then((response) => {
      console.log("CompanyList:: List Of Employees", response);

      if (response === false) {
        toast.error("Something went wrong !", {
          theme: "light",
          autoClose: 1000,
        });
      } else {
        const companiesWithSelection = response.documents.map((company) => ({
          ...company,
          selected: false,
        }));
        setCompanys(companiesWithSelection);
        setCompanyDataValue(companiesWithSelection[0]);
      }
    });
  }, []);

  useEffect(() => {
    // Enable delete button if any checkbox is selected
    setIsDeleteEnabled(selectedRows.length > 0);
  }, [selectedRows]);

  const handleDeleteClick = () => {
    setShowCheckboxes(true);
  };

  const handleCancelClick = () => {
    setShowCheckboxes(false);
    setSelectedRows([]);
    setIsDeleteEnabled(false);
  };

  const handleDeleteConfirm = () => {
    // Perform deletion of selected companies
    // Call your delete API here passing selectedRows
    // companyApis.deleteCompanies(selectedRows);

    // Clear selected rows and disable delete button
    setSelectedRows([]);
    setIsDeleteEnabled(false);
    setShowCheckboxes(false);
  };

  const handleSelectionChange = (companyId) => {
    const updatedCompanies = companys.map((company) =>
      company.company_id === companyId
        ? { ...company, selected: !company.selected }
        : company
    );
    setCompanys(updatedCompanies);

    // Update selected rows
    const updatedSelectedRows = updatedCompanies
      .filter((company) => company.selected)
      .map((company) => company.company_id);
    setSelectedRows(updatedSelectedRows);
  };

  const handleHeaderCheckboxChange = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(companys.map((company) => company.company_id));
      setSelectAll(true);
    }
  };

 

  useEffect(() => {
    // Enable delete button if any checkbox is selected
    setIsDeleteEnabled(selectedRows.length > 0);
  }, [selectedRows]);


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
      {!showCheckboxes && (
        <MDBBtn onClick={handleDeleteClick}>Delete</MDBBtn>
      )}
      {showCheckboxes && (
        <>
          <MDBBtn onClick={handleCancelClick}>Cancel</MDBBtn>
          <MDBBtn
            color="danger"
            onClick={handleDeleteConfirm}
            disabled={!isDeleteEnabled}
          >
            Delete
          </MDBBtn>
        </>
      )}
      <MDBTable align="middle" className="table table-hover">
        <MDBTableHead>
          <tr className="text-center">
            {showCheckboxes && (
              <th style={{ width: "80px", height: "60px" }}>
                <Form.Check
                  type="checkbox"
                  onChange={handleHeaderCheckboxChange}
                  checked={selectAll}
                />
              </th>
            )}
            <th scope="col">S.N.</th>
            <th scope="col">Company Code</th>
            <th scope="col">Company Name</th>
            <th scope="col">Address</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {companys.map((company, index) => (
            <tr
              key={index}
              onClick={() =>
                !showCheckboxes && handleEmpDetailClick(company)
              }
              style={{
                cursor: "pointer",
                backgroundColor: company.selected ? "red" : "",
              }}
              className="text-center"
            >
              {showCheckboxes && (
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={company.selected}
                    onChange={() => handleSelectionChange(company.company_id)}
                  />
                </td>
              )}
              <td>
                <p className="fw-bold mb-1">{index + 1}</p>
              </td>
              <td>
                <p className="fw-bold mb-1">{company.company_code}</p>
              </td>
              <td>
                <p className="fw-bold mb-1">{company.name}</p>
              </td>
              <td>
                <p className="fw-bold mb-1">{company.company_address}</p>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <DownBar />
    </div>
  );
}
