import React, { useState } from 'react';
import { Table, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import context from 'react-bootstrap/esm/AccordionContext';
import { useNavigate } from 'react-router-dom';
import { useEmployeeData } from '../../context/EmployeeContext';

const BulkSalaryProcess = () => {

  const { setEmployeeDataValue } = useEmployeeData();
  const navigate =useNavigate()
  const [selectAll, setSelectAll] = useState(false);

  // State to manage employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', designation: 'Software Engineer', totalDays: 20, leaves: 2, selected: false },
    { id: 2, name: 'Ram', designation: 'Software Engineer', totalDays: 21, leaves: 5, selected: false },
    { id: 3, name: 'John malik', designation: 'TA', totalDays: 23, leaves: 6, selected: false },
    { id: 4, name: 'Pappu', designation: 'Gov Emp', totalDays: 25, leaves: 4, selected: false }
    // Add more employees as needed


  ]);


  useEffect(() => {
    

    
  }, []);



  // Function to toggle selection for all employees
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedEmployees = employees.map(employee => ({
      ...employee,
      selected: !selectAll
    }));
    setEmployees(updatedEmployees);
  };

 // Event handler for toggling selection
const handleSelectionChange = (employeeId) => {
    const index = employees.findIndex(employee => employee.id === employeeId);
    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = { ...updatedEmployees[index], selected: !updatedEmployees[index].selected };
      setEmployees(updatedEmployees);
    }
  };
  
  // Event handler for editing working days
  const handleWorkingDaysChange = (employeeId, value) => {
    const index = employees.findIndex(employee => employee.id === employeeId);
    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = { ...updatedEmployees[index], totalDays: parseInt(value, 10) };
      setEmployees(updatedEmployees);
    }
  };
  
  // Event handler for editing leaves
  const handleLeavesChange = (employeeId, value) => {
    const index = employees.findIndex(employee => employee.id === employeeId);
    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = { ...updatedEmployees[index], leaves: parseInt(value, 10) };
      setEmployees(updatedEmployees);
    }
  };

  //Event handler for a row click : Salary process for a single emp should open

  const handleEmployeeRowClick=(event, employeeId)=>{
    // handling the double click only
    if (event.detail === 2) {
        /* 1. Set the emp context
        2. Navigating to /salaryprocess
        3. check on that file , we shlud be using the emp context to populate CompanyDetails */


        console.log('double click');
        /* setEmployeeDataValue(Employee);
        navigate("/employeeprofile"); */
      }
  }

  

  // Event handler for submitting data
  const handleSubmit = () => {
    // Prepare data for API call
    const selectedEmployees = employees.filter(employee => employee.selected);
    // Make API call to save data
  };

  return (
    <div>
      <Table striped bordered hover >
        <thead>
          <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Designation</th>
            <th>Total Working Days</th>
            <th>Leaves</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
            <td>
                <Form.Check
                  type="checkbox"
                  checked={employee.selected}
                  onChange={() => handleSelectionChange(employee.id)}
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.id}</td>
              <td>{employee.designation}</td>
              <td>
                <Form.Control
                  type="number"
                  value={employee.totalDays}
                  onChange={(e) => handleWorkingDaysChange(employee.id, e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={employee.leaves}
                  onChange={(e) => handleLeavesChange(employee.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default BulkSalaryProcess;
