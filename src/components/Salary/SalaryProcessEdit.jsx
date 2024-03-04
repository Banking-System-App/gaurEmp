import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  FormControl,
} from "react-bootstrap";
import { salaryApi } from "../../database/salaryApi";
import { useNavigate } from "react-router-dom";
import { useCompanyData } from "../../context/CompanyContext";
import { useEmployeeData } from "../../context/EmployeeContext";
import { salaryUtil } from "../../utils/SalaryUtil";
import salaryApis from "../../database/SalaryAPIs";
import { toast } from "react-toastify";

export default function SalaryProcessEdit() {
  const { EmployeeDetails } = useEmployeeData();
  const { CompanyDetails } = useCompanyData();
  const navigate = useNavigate();

  const [SalaryStructure, setSalaryStructure] = useState({})
  

  const [earning, setEarning] = useState({
    basic:0,
    hra :0,
    da :0,
  });

  const [grossEarnings, setGrossEarnings] = useState(0)

  const [varDays, setVarDays] = useState({
    Days: 0,
    Leave: 0,
    WOP: 0,
  });

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
 

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

  useEffect(() => {
    salaryApis
      .getSalaryStructuresByEmpId(EmployeeDetails.emp_id, CompanyDetails.company_id)
      .then((response) => {
        console.log("SalaryProcessEdit:: SalaryStructure ", response);
        if (response === false) {
          toast.error("Loading Salary Structure Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          setSalaryStructure(response.documents[0])
        }
      });
  }, []);

  useEffect(() => {
    setGrossEarnings(
      salaryUtil.calculateGrossEarnings({
        basic: earning.basic,
        hra: earning.hra,
        da: earning.da,
      })
    );

    console.log("gross Earnings", grossEarnings);
  }, [earning]);

  const handleVarDays = (dataKey, data) => {
    console.log("Change ${dataKey} ", data);
    setVarDays((prevData) => ({
      ...prevData,
      [dataKey]: data,
    }));
  };

  const handleEarningsChange = (dataKey, data) => {
    console.log("Change ${dataKey} ", data);
    setEarning((prevData) => ({
      ...prevData,
      [dataKey]: data,
    }));
  };


  

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col xs={6}>
            <h1 className="display-6">{CompanyDetails.name}</h1>
            <p>{CompanyDetails.company_address}</p>
          </Col>
          <Col xs={6} className="text-end">
            <p>Salary for the month: {salaryData.month}</p>
            <p>Emp No: {employee.emp_id}</p>
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
            <Button color="success" >
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
            <p>Name: {EmployeeDetails.emp_name}</p>
            <p>Designation: {EmployeeDetails.designation}</p>
            <p>UAN: {EmployeeDetails.uan_num}</p>
          </div>
          <div className="col-sm-6">
            <p>Emp No: {EmployeeDetails.emp_id}</p>
            <p>Location: {EmployeeDetails.location}</p>
            <p>PF No: {EmployeeDetails.pf_number}</p>
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
                  <td >{SalaryStructure.basic}</td>
                  <td
                   onChange={(e) => handleEarningsChange("basic", e.target.value)}
                  >
                    {salaryUtil.calculateBasic(
                      SalaryStructure.basic,
                      varDays.Days
                    )}
                  </td>
                </tr>
                <tr>
                  <td>DA</td>
                  <td>{SalaryStructure.da}</td>
                  <td onChange={(e) => handleEarningsChange("da", e.target.value)}>{salaryUtil.calculateDA(SalaryStructure.da,varDays.Days)}</td>
                </tr>
                <tr>
                  <td>HRA</td>
                  <td>{SalaryStructure.hra}</td>
                  <td onChange={(e) => handleEarningsChange("hra", e.target.value)}>{salaryUtil.calculateHRA(SalaryStructure.hra,varDays.Days)}</td>
                </tr>
                {/* Add more rows for other earnings as needed */}
              </tbody>
              <tfoot>
                <tr>
                  <th>Gross Earnings</th>
                  <th></th>
                  <th>{grossEarnings}</th>
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
