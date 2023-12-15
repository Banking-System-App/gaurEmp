import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { databaseApi } from '../database/databaseApi';
import { useParams } from 'react-router-dom';

const Addemp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);


  const [employeeData, setEmployeeData] = useState({
    empName: '',
    gender: '',
    email: '',
    mobile: '',
    dob: '',
    address: '',
    doj: '',
    panNumber: '',
    Aadhar: '',
    compName: ''
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddEmployee = async () => {
    try {
      await databaseApi.createEmployee(
        employeeData.empName,
        employeeData.gender,
        employeeData.email,
        employeeData.mobile,
        employeeData.dob,
        employeeData.address,
        employeeData.doj,
        employeeData.panNumber,
        employeeData.Aadhar,
        compName
      );
      handleCloseModal();

      // Refresh the list of companies after adding a new one
      const compEmployees = await databaseApi.getEmployeesByCompanyName(compName);
      setEmployees(compEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmployees = (employee) => {
    // Implement logic to handle viewing employees for the selected company
    console.log(`View employees for ${employee.empName}`);

  };

  const handleUpdate = (employee) => {
    // Implement logic to handle updating the selected company
    console.log(`Update ${employee.empName}`);

  };

  const handleDelete = (employee) => {
    // Implement logic to handle deleting the selected company
    console.log(`Delete ${employee.empName}`);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const compEmployees = await databaseApi.getEmployeesByCompanyName(compName);
        setEmployees(compEmployees);
        console.log('All Employees = ', compEmployees)
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []); 
  
  // Fetch companies on component mount
  const {compName} =  useParams()
  console.log(compName)
  return (
    <div className="container">
      <h1>Add Employee</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Add
      </Button>
      
      <Modal show={showModal} onHide={handleCloseModal} id="employeeModal">
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="empName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee name"
                name="empName"
                value={employeeData.empName}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Form.Group controlId="compName">
              <Form.Label></Form.Label>
              <Form.Control
                type="hidden"
                placeholder=""
                name="compName"
                value={compName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gender"
                name="gender"
                value={employeeData.gender}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                name="email"
                value={employeeData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile"
                name="mobile"
                value={employeeData.mobile}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="dob">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="dob"
                value={employeeData.dob}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee address"
                name="address"
                value={employeeData.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="doj">
              <Form.Label>DOJ</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="doj"
                value={employeeData.doj}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="panNumber">
              <Form.Label>PAN No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pan number"
                name="panNumber"
                value={employeeData.panNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="aadhar">
              <Form.Label>Aadhar.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhar number"
                name="aadhar"
                value={employeeData.aadhar}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddEmployee(compName)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <h2>All Employees</h2>

      {employees && employees.length === 0 ? (
        <p>No Employees available</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.$id}>
              {employee.empName} - {employee.aadhar} - 
              <Button variant="secondary" onClick={() => handleEmployees(employee)}>More Info</Button>
              <Button variant="primary" onClick={() => handleUpdate(employee)}>Update</Button>
              <Button variant="primary" onClick={() => handleDelete(employee)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default Addemp;