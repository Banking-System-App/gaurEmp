import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { databaseApi } from '../database/databaseApi';
import { useNavigate } from 'react-router-dom';
// Adjust the path based on your project structure

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate()
  const [companyData, setCompanyData] = useState({
    compName: '',
    location: '',
    experience: '',
    email: '',
    address: '',
    pfMember: '',
    otPayable: '',
    panNumber: ''
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddCompany = async () => {
    try {
      await databaseApi.createCompany(
        companyData.compName,
        companyData.location,
        companyData.experience,
        companyData.email,
        companyData.address,
        companyData.pfMember,
        companyData.otPayable,
        companyData.panNumber,
        companyData.panNumber
      );
      handleCloseModal();
      // Refresh the list of companies after adding a new one
      const allCompanies = await databaseApi.getAllCompanies();
      setCompanies(allCompanies);
    } catch (error) {
      console.error(error);
    }
  };


  const handleEmployees = (company) => {
    // Implement logic to handle viewing employees for the selected company
    console.log(`View employees for ${company.compName}`);
    navigate(`/employees/${company.compName}`, { state: { company } });
  };
  
  const handleUpdate = (company) => {
    // Implement logic to handle updating the selected company
    console.log(`Update ${company.compName}`);
  };
  
  const handleDelete = (company) => {
    // Implement logic to handle deleting the selected company
    console.log(`Delete ${company.compName}`);
  };


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const allCompanies = await databaseApi.getAllCompanies();
        setCompanies(allCompanies);
        console.log('All Companies = ', allCompanies)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []); // Fetch companies on component mount

  return (
    <div className="container">
      
      <h1>Add Company</h1>

      <Button variant="primary" onClick={handleShowModal}>
        Add
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} id="companyModal">
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="compName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                name="compName"
                value={companyData.compName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company location"
                name="location"
                value={companyData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company experience"
                name="experience"
                value={companyData.experience}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter company email"
                name="email"
                value={companyData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company address"
                name="address"
                value={companyData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="pfMember">
              <Form.Label>PF Member</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="pfMember"
                value={companyData.pfMember}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="otPayable">
              <Form.Label>OT Payable</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="otPayable"
                value={companyData.otPayable}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="panNumber">
              <Form.Label>PAN No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pan number"
                name="panNumber"
                value={companyData.panNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCompany}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <h2>All Companies</h2>

      {companies && companies.length === 0 ? (
        <p>No companies available</p>
      ) : (
        <ul>
          {companies.map((company) => (
            <li key={company.$id}>
              {company.compName} - {company.location} -
              <Button variant="secondary" onClick={() => handleEmployees(company)}>Employees</Button>
              
              <Button variant="primary" onClick={() => handleUpdate(company)}>Update</Button>
              <Button variant="primary" onClick={() => handleDelete(company)}>Delete</Button>
              
            </li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default Profile;

