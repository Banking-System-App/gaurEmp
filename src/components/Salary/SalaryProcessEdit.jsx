import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { salaryApi } from "../../database/salaryApi";
import { useNavigate } from "react-router-dom";
import { useCompanyData } from "../../context/CompanyContext";
import { useEmployeeData } from "../../context/EmployeeContext";
import { salaryUtil } from "../../utils/SalaryUtil";

export default function SalaryProcessEdit() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [earning, setEarning] = useState({});
  const [earningDetails, setEarningDetails] = useState({
    basic: 0,
    hra: 0,
    da: 0,
  });
  const [deductionDetails, setDeductionDetails] = useState({
    washing: 0,
    pf: 0,
    esi: 0,
    incomeTax: 0,
  });

  const { EmployeeDetails } = useEmployeeData();
  const { CompanyDetails } = useCompanyData();

  console.log("Company Data at Salary Proceess page ", CompanyDetails);
  console.log("Employee Data at Salary Proceess page ", EmployeeDetails);

  useEffect(() => {
    const fetchEmployeeSalaryByEmpId = async () => {
      try {
        await salaryApi
          .getSalaryStructuresByEmpId(EmployeeDetails.emp_id)
          .then((response) => {
            console.log("lodaaa at salary process", response[0]);
            // setEarning((response));
            setEarning(
              salaryUtil.updatedSalaryData(
                salaryUtil.sortedSalaryData(response)[0]
              )
            );
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeeSalaryByEmpId();
  }, []);

  console.log("earnig i s ", earning);

  const navigate = useNavigate();

  const handleEmployeeSubmit = () => {
    // Placeholder logic to fetch employee details based on employee number
    // Replace the following example with your actual API call or data fetching logic
    const fetchedEmployeeDetails = {
      employeeName: "John Doe",
      // ... other employee details
    };
    setEmployeeName(fetchedEmployeeDetails.employeeName);
  };

  const handleSalarySubmit = () => {
    // Placeholder logic to fetch salary details based on employee number, month, and year
    // Replace the following example with your actual API call or data fetching logic
    const fetchedSalaryDetails = {
      earning: {
        base: 15000,
        hra: 3000,
        da: 2000,
      },
      deduction: {
        washing: 500,
        pf: 1000,
        esi: 200,
        incomeTax: 1500,
      },
    };
    setEarningDetails(fetchedSalaryDetails.earning);
    setDeductionDetails(fetchedSalaryDetails.deduction);
  };

  const handleGenerateSlip = () => {
    navigate("/generateslippdf");

    console.log("Generating salary slip...");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <h1 className="text-center mb-4">Salary Process Edit</h1>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol md="3">
            <input
              type="text"
              className="form-control"
              placeholder="Employee Number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="2">
            <input
              type="text"
              className="form-control"
              placeholder="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="2">
            <input
              type="text"
              className="form-control"
              placeholder="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="2">
            <MDBBtn color="success" onClick={handleEmployeeSubmit}>
              Submit
            </MDBBtn>
          </MDBCol>
        </MDBRow>

        {employeeName && (
          <MDBRow className="mb-4">
            <MDBCol>
              <h5>Employee Name: {employeeName}</h5>
            </MDBCol>
          </MDBRow>
        )}

        <MDBRow className="mb-4">
          <MDBCol md="2">
            <input type="text" className="form-control" placeholder="EL" />
          </MDBCol>
          <MDBCol md="2">
            <input type="text" className="form-control" placeholder="WP" />
          </MDBCol>
          <MDBCol md="2">
            <input type="text" className="form-control" placeholder="OD" />
          </MDBCol>
          <MDBCol md="2">
            <input type="text" className="form-control" placeholder="OT" />
          </MDBCol>
          <MDBCol md="2">
            <MDBBtn color="success" onClick={handleSalarySubmit}>
              Submit
            </MDBBtn>
          </MDBCol>
        </MDBRow>

        {earning.basic !== 0 && (
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Earning</th>
                        <th>Amount</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {Object.entries(salaryUtil.earning(earning)).map(
                        ([category, amount], index) => (
                          <tr key={index}>
                            <td>{category}</td>
                            <td>{amount}</td>
                          </tr>
                        )
                      )}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        )}

        {deductionDetails.washing !== 0 && (
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Deduction</th>
                        <th>Amount</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {Object.entries(deductionDetails).map(
                        ([category, amount], index) => (
                          <tr key={index}>
                            <td>{category}</td>
                            <td>{amount}</td>
                          </tr>
                        )
                      )}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        )}

        {earningDetails.base !== 0 && deductionDetails.washing !== 0 && (
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBBtn color="success" onClick={handleGenerateSlip}>
                Generate Slip
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    </section>
  );
}
