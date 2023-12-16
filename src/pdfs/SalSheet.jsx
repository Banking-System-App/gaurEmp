import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { databaseApi } from '../database/databaseApi';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

const SalSheet = () => {
  const [employees, setEmployees] = useState([]);
  const { compName } = useParams();

  useEffect(() => {
    const fetchEmployees1 = async () => {
      try {
        const compEmployees = await databaseApi.getEmployeesByCompanyName('Hrituraj Power');
        setEmployees(compEmployees);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees1();
  }, [compName]);

  console.log("Employees are for pdf generation : ",employees)

  const generatePDF = () => {
    const pdf = new jsPDF();

    // header
    pdf.setFontSize(18);
    pdf.text('Employee Salary Sheet', 20, 20);

    // company name and address
    pdf.setFontSize(12);
    // pdf.text(`Company Name: ${compName}`, 20, 30);
    pdf.text(`Company name: Hrituraj Power`, 20, 30);
    pdf.text('Company Address: G-140 Noida Sector 20, UP (India)', 20, 40);

    // table header
    const headers = ['Serial No.', 'Employee Name', 'DOJ', 'Monthly Rate', 'Basic Salary', 'DA', 'HRA', 'Total Salary', 'Signature'];
    const data = employees.map((employee, index) => [
      index + 1,
      employee.empName,
      employee.doj,
      'Your Monthly Rate',
      'Your Basic Salary',
      'Your DA', 
      'Your HRA',
      'Your Total Salary',
      'Employee Signature',
    ]);

    pdf.autoTable({
      head: [headers],
      body: data,
      startY: 50,
    });

    pdf.save('Salary Sheet.pdf');
  };

  return (
    <div className="container">
      <h1>Employee List</h1>

      <Button variant="primary" onClick={generatePDF}>
        Generate PDF
      </Button>

      <h2>All Employees</h2>

      {employees && employees.length === 0 ? (
        <p>No Employees available</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.$id}>
              {employee.empName} - {employee.aadhar} -{' '}
              {/* Additional employee information */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalSheet;
