// import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employerApi } from '../../database/employerApi';
import { EmployerUtil } from '../../utils/EmployerUtil';

export default function EmployerProfile() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addemployee');
  }

  const handleViewEmployees = () => {
    navigate('/viewemployees');
  }

  //call api call and set into intial data
  const [isEditMode, setIsEditMode] = useState(false);
  const [employer, setEmployer] = useState([]);
  const [editableData, setEditableData] = useState({ ...employer[0] });

  useEffect(() => {
    const getEmployerDetails = async () => {
      try {
        const response = await employerApi.getEmployerDetail('fgg').then((response)=>{
          console.log('Employer Profile is ', response);
          setEmployer(response[0]);
          setEditableData(response[0]);
        });
        
      } catch (error) {
        console.error(error);
      }
    }
    getEmployerDetails();
  }, []);

  const handleInputChange = (label, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleSave = () => {
    console.log('Updated Data:', editableData);
    console.log("Emp loyer id : ", employer.$id);
    employerApi.updateEmployerData(editableData.$id, EmployerUtil.updatedData(editableData))
    alert("Employer Details Edited Successfully");
    setIsEditMode(false);
  };


  const handleEditClick = () => {
    setIsEditMode(true);
    console.log("button clickeed", isEditMode);

  };
  const handleCancelEdit = () => {
    setEditableData({ ...employer });
    setIsEditMode(false);
  };

  // const changelabel = {
  //   employer_id: "Employer Id",
  //   employer_address: "Employer Address",
  //   name: "Employer Name",
  //   group: "Group",
  //   pan_numer: "Pan Number",
  //   location_office: "Location Office",
  //   ot_rate: "Over Time Rate",
  //   tan_no: "Tan Number",
  // }



  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
              <MDBBtn className="ms-auto m-3" color='success' size='lg'>
                Salary Process Edit
              </MDBBtn>
              <MDBBreadcrumbItem>
                {/* <a href='#'>Home</a> */}
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>


        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '228px' }}
                  fluid />
                <p className="text-muted mb-1">Comapny Name</p>
                <p className="text-muted mb-4">Address of the Company </p>
                <div className="d-flex justify-content-center mb-2">
                  
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {Object.entries(EmployerUtil.updatedData(editableData)).map(([label, value]) => (
                  

                  <div key={label}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{EmployerUtil.changelabel[label]}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {isEditMode ? (
                          <input
                            type='text'
                            className='form-control'
                            value={value}
                            onChange={(e) => handleInputChange(label, e.target.value)}
                          />
                        ) : (
                          <MDBCardText className='=text-muted'>{value}</MDBCardText>
                        )
                        }
                      </MDBCol>

                    </MDBRow>
                    <hr />
                  </div>
                  
                ))}
                {isEditMode && (
                  <>
                    <MDBBtn className='me-8 m-3' color="success" onClick={handleSave}>
                      Save
                    </MDBBtn>
                    <MDBBtn className='me-8 m-3' color="danger" onClick={handleCancelEdit}>
                      Cancel
                    </MDBBtn>
                  </>

                )
                }

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-center mb-3">
          <MDBBtn className='me-8 m-3' color='success' size='lg' onClick={handleViewEmployees}>
            View Employees
          </MDBBtn>
          <MDBBtn className='me-8 m-3' color='success' size='lg' onClick={handleClick}>
            Add Employee
          </MDBBtn>
          <MDBBtn className="me-8 m-3" color='success' onClick={handleEditClick} size='lg'>
            Edit Details
          </MDBBtn>
        </div>
      </MDBContainer>
    </section>
  );
}