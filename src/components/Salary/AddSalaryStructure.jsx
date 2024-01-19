import React, { useState } from 'react';
import { salaryApi } from '../../database/salaryApi';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { useEmployeeData } from '../../context/EmployeeContext';


export default function AddSalaryStructure() {
  const { EmployeeDetails } = useEmployeeData();
  console.log("Employee Detail is : ", EmployeeDetails);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  
    "Employee Type": '',
    BasicSalary: '',
    "DA": '',
    "HRA": '',
    "Convayance": '',
    WashingAllowance: '',
    MedicalAllowance: '',
    OtherAllowance: '',
    "Year": '',
    "Month": ''
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
    console.log('Emplyee id in add salary strurtre:', EmployeeDetails.$id);
    console.log('Emplyee whole in add salary strurtre:', EmployeeDetails);

    salaryApi.createSalaryStrcture(
      EmployeeDetails.$id,
      EmployeeDetails.emp_name,
      formData.EmployeeType,
      EmployeeDetails.comp_id,
      formData.BasicSalary,
      formData.DA,
      formData.HRA,
      formData.Convayance,
      formData.WashingAllowance,
      formData.MedicalAllowance,
      formData.OtherAllowance,
      formData.Year,
      formData.Month,
    )
    alert(`Salary Structure for employee ID ${EmployeeDetails.name} Added Successfully`)
    navigate('/salarystructure');
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
