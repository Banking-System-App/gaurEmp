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

  useEffect(() => {
    const getEmployerDetails = async () => {
      try {
        const response = await employerApi.getEmployerDetail('fhht').then((response)=>{
          console.log('Employer Profile is ', response);
          setEmployer(response);
        });
        
      } catch (error) {
        console.error(error);
      }
    }
    getEmployerDetails();
  }, []);

  

  const intialData = {
    'Company ID': String(employer.employer_id),
  };

  const [editableData, setEditableData] = useState({ ...intialData });
  //************************************************** */
  //ye rerender bar bar ho rha hai ise baad me dekhenge
  //************************************************** */
  useEffect(() => {
    console.log("Loop check in employer profile")
    const initialData = {
      'employer_id': String(employer.employer_id ?? ''),
    };
    setEditableData({ ...initialData });
  }, []);
  
  
  //console.log("Initia datatatata ", employer[0]);

  
 // console.log('Edited Data is:', editableData);

  const handleInputChange = (label, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };



  const handleSave = () => {
    // Implement logic to save the edited data (e.g., send to backend)
    const resp = employerApi.updateEmployerData(editableData, employer.$id)
    console.log('Updated Data:', resp);
    setIsEditMode(false);
  };


  const handleEditClick = () => {
    setIsEditMode(true);
    console.log("button clickeed", isEditMode);

  };
  const handleCancelEdit = () => {
    setEditableData({ ...intialData });
    setIsEditMode(false);
  };



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
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {Object.entries(editableData).map(([label, value], index) => (
                  <div key={index}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{label}</MDBCardText>
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