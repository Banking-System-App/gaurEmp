import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
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

  const employee = {
    name: "John Doe",
    designation: "Software Engineer",
    uan: "1234567890",
    location: "Mumbai",
    pfNo: "ABC12345",
    empNo: "1001",
    companyName: "CONCERTEBAR BUILDCON LLP",
    companyAddress:
      "I WING.435 ROCK ENCLAVE BUILD NO 2opp jayice cream hindustan nakakandivali west 400067",
  };

  const salaryData = {
    month: "January 2024",
    basic: {
      rate: 50000,
      earnings: 50000,
    },
    da: {
      rate: 10000,
      earnings: 10000,
    },
    hra: {
      rate: 15000,
      earnings: 15000,
    },
    // Add more earnings objects as needed
    deductions: {
      pf: 2000,
      // Add more deductions objects as needed
    },
    grossEarnings: 75000,
    totalDeductions: 2000,
    netPayable: 73000,
  };

  const [varDays, setVarDays] = useState({
    Days: 0,
    Leave: 0,
    WOP: 0,
  });

  const { EmployeeDetails } = useEmployeeData();
  const { CompanyDetails } = useCompanyData();

  const handleVarDays = (dataKey, data) => {
    console.log("Change ${dataKey} ", data);
    setVarDays((prevData) => ({
      ...prevData,
      [dataKey]: data,
    }));
  };

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
      <Container className="py-5">
        <Row className="align-items-center">
          <Col xs={6}>
            <h1 className="display-6">{employee.companyName}</h1>
            <p>{employee.companyAddress}</p>
          </Col>
          <Col xs={6} className="text-end">
            <p>Salary for the month: {salaryData.month}</p>
            <p>Emp No: {employee.empNo}</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="3">
            <input
              type="text"
              className="form-control"
              placeholder="Employee Number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
            />
          </Col>
          <Col md="2">
            <input
              type="text"
              className="form-control"
              placeholder="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </Col>
          <Col md="2">
            <input
              type="text"
              className="form-control"
              placeholder="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </Col>
          <Col md="2">
            <Button color="success" onClick={handleEmployeeSubmit}>
              Submit
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="2">
            <input
              type="text"
              className="form-control"
              placeholder="Days"
              value={varDays.Days}
              onChange={(e) => handleVarDays("Days", e.target.value)}
            />
          </Col>
          <Col md="2">
            <input
              type="text"
              className="form-control"
              placeholder="Leave"
              value={varDays.Leave}
              onChange={(e) => handleVarDays("Leave", e.target.value)}
            />
          </Col>
          <Col md="2">
            <input
              type="text"
              className="form-control"
              placeholder="WOP"
              value={varDays.WOP}
              onChange={(e) => handleVarDays("WOP", e.target.value)}
            />
          </Col>
        </Row>

        <div className="row">
          <div className="col-sm-6">
            <p>Name: {employee.name}</p>
            <p>Designation: {employee.designation}</p>
            <p>UAN: {employee.uan}</p>
          </div>
          <div className="col-sm-6">
            <p>Emp No: {employee.empNo}</p>
            <p>Location: {employee.location}</p>
            <p>PF No: {employee.pfNo}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Rate</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic</td>
                  <td>{salaryData.basic.rate}</td>
                  <td>
                    {salaryUtil.calculateBasic(
                      salaryData.basic.rate,
                      varDays.Days
                    )}
                  </td>
                </tr>
                <tr>
                  <td>DA</td>
                  <td>{salaryData.da.rate}</td>
                  <td>{salaryData.da.earnings}</td>
                </tr>
                <tr>
                  <td>HRA</td>
                  <td>{salaryData.hra.rate}</td>
                  <td>{salaryData.hra.earnings}</td>
                </tr>
                {/* Add more rows for other earnings as needed */}
              </tbody>
              <tfoot>
                <tr>
                  <th>Gross Earnings</th>
                  <th></th>
                  <th>{salaryData.grossEarnings}</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="col-sm-6">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PF Contribution</td>
                  <td>{salaryData.deductions.pf}</td>
                </tr>
                {/* Add more rows for other deductions as needed */}
              </tbody>
              <tfoot>
                <tr>
                  <th>Gross Deductions</th>
                  <th>{salaryData.totalDeductions}</th>
                </tr>
                <tr>
                  <th>Net Payable</th>
                  <th>{salaryData.netPayable}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-end">
            <p>Date of Payment:</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
