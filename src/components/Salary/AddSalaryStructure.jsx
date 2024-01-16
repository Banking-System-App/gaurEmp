import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function AddSalaryStructure() {
  const [formData, setFormData] = useState({
    month: '',
    basicSalary: '',
    salaryType: '',
    hra: '',
    da: '',
    dateOfSlip: '',
    tax: '',
  });

  const handleInputChange = (label, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleSave = () => {
    // Add logic to save the form data
    console.log('Form Data:', formData);
    // You can make an API call to save the data or perform other actions
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol>
          <MDBCard className="mb-4">
            <MDBCardBody>
              <h2 className="mb-4">Add Salary Structure</h2>
              {Object.entries(formData).map(([label, value]) => (
                <div key={label}>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>{label}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        type='text'
                        className='form-control'
                        value={value}
                        onChange={(e) => handleInputChange(label, e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </div>
              ))}
              <MDBBtn className='me-8 m-3' color="success" onClick={handleSave}>
                Save
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
