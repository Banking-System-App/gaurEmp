import jsPDF from "jspdf";
import "jspdf-autotable";

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

import { salaryApi } from "../database/salaryApi";
import { salaryUtil } from "../utils/SalaryUtil";
import { useNavigate } from "react-router-dom";
import { useCompanyData } from "../context/CompanyContext";
import { useEmployeeData } from "../context/EmployeeContext";

export default function SalSheet() {
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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);

    doc.setProperties({
      title: "Salary Slip - October 2023",
      subject: "Salary details for Ms Sneha Shah",
      author: "CONCERTEBAR BUILDCON LLP",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const mid = pageWidth / 2;
    const uppermargin = 20;
    const lineSpacing = 5;

    const lineNum = (linenumber) => {
      return uppermargin + linenumber * lineSpacing;
    };
    const calculateCenterX = (text) => {
      const fontSize = doc.internal.getFontSize();
      const textWidth = doc.getTextWidth(text);
      return (pageWidth - textWidth) / 2;
    };

    const companyName = "CONCERTEBAR BUILDCON LLP";
    const companyAddress1 = "I WING.435 ROCK ENCLAVE BUILD NO 2";
    const companyAddress2 =
      "opp jayice cream hindustan naka kandivali west 400067";

    doc.text(companyName, calculateCenterX(companyName), lineNum(1));
    doc.text(companyAddress1, calculateCenterX(companyAddress1), lineNum(2));
    doc.text(companyAddress2, calculateCenterX(companyAddress2), lineNum(3));

    doc.text("Salary for the month: October 2023", 10, lineNum(5));
    doc.text("Name    : Ms Sneha Shah", 10, lineNum(6));
    doc.text("Emp No  : 17", mid, lineNum(6));
    doc.text("Location: ", 10, lineNum(7));
    doc.text("Designation: UNSKILLED", mid, lineNum(7));
    doc.text("P F No: KDMAL1818048000/10011", 10, lineNum(8));
    doc.text("UAN: 101430860842", mid, lineNum(8));
    doc.text("E S I C No: ", 10, lineNum(9));
    doc.text("Days :", 10, lineNum(10));
    doc.text("Leave: 15.0", mid - 30, lineNum(10));
    doc.text("WOP: 0.0", 150, lineNum(10));

    const earningsData = [
      ["Description", "Rate", "Earnings"],
      ["Basic", 19265, 9322],
      ["DA", 902, 436],
      ["HRA", "", ""],
    ];

    doc.autoTable({
      head: [earningsData[0]],
      body: earningsData.slice(1),
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
      },
      startY: lineNum(12),
      margin: { top: 120 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 20, align: "right" },
        2: { cellWidth: 25, align: "right" },
      },
    });

    const deductionsData = [
      ["Description", "Deductions"],
      ["PF Contribution", 1171],
      ["ESI Contribution", 74],
    ];

    doc.autoTable({
      head: [deductionsData[0]],
      body: deductionsData.slice(1),
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
      },
      startY: lineNum(12),
      margin: { left: mid, top: 120 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25, align: "right" },
      },
    });

    doc.text("Gross Earnings", 10, lineNum(20));
    doc.text("9758", mid - 30, lineNum(20), { align: "right" });
    doc.text("Gross Deductions", mid, lineNum(20));
    doc.text("1245", mid * 2 - 30, lineNum(20), { align: "right" });
    doc.text("Net Payable", 10, lineNum(21));
    doc.text("8513", mid * 2 - 30, lineNum(21), { align: "right" });
    doc.text("Date of Payment:", 10, lineNum(22));

    doc.save("salary_slip.pdf");
  };

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
              <MDBBtn color="success" onClick={generatePDF}>
                Generate Slip
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    </section>
  );
}
