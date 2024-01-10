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
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  export default function EmployerProfile() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/addemployee');
      alert("Button clicked");
    }
    
    const handleViewEmployees = () => {
      navigate('/viewemployees');
      alert("Button clicked");
    }
    
  
    // const sampleData = [
    //   { label: 'Company ID', value: '1' },
    //   { label: 'Company Name', value: 'ABC Corp' },
    //   { label: 'Address', value: '123 Main St, Cityville' },
    //   { label: 'IS PF Member', value: 'Yes' },
    //   { label: 'PF Code', value: '123456' },
    //   { label: 'Group', value: 'Technology' },
    //   { label: 'PF Limit', value: '100000' },
    //   { label: 'IS ES member', value: 'Yes' },
    //   { label: 'ESI Code', value: 'ABC1234567' },
    //   { label: 'L Office', value: 'New York' },
    //   { label: 'IS LWF', value: 'Yes' },
    //   { label: 'LWF Code', value: 'LWF123' },
    //   { label: 'IS OT Payable', value: 'Yes' },
    //   { label: 'OT Rate', value: '15.50' },
    //   { label: 'PAN Number', value: 'ABC123P' },
    //   { label: 'TAN Number', value: 'TAN123' },
    // ];
  

  //call api call and set into intial data
  
    const intialData= {
      'Company ID': '1',
      'Company Name': 'ABC Corp',
      'Address': '123 Main St, Cityville' ,
      'IS PF Member': 'Yes',
      'PF Code': '123456',
      'Group': 'Technology',
      'PF Limit': '100000',
      'IS ES member': 'Yes',
      'ESI Code': 'ABC1234567',
        'L Office': 'New York' ,
       'IS LWF': 'Yes' ,
      'LWF Code': 'LWF123' ,
       'IS OT Payable': 'Yes',
      'OT Rate': '15.50',
      'PAN Number': 'ABC123P' ,
      'TAN Number': 'TAN123' 
  
      // ... (other data fields)
    };
    const [editableData,setEditableData]=useState({ ...intialData});
    const [isEditMode,setIsEditMode]=useState(false);
  
  
    const handleInputChange = (label, value) => {
      setEditableData((prevData) => ({
        ...prevData,
        [label]: value,
      }));
    };
    const handleSave = () => {
      // Implement logic to save the edited data (e.g., send to backend)
      console.log('Edited Data:', editableData);
      setIsEditMode(false);
    };
    

    const handleEditClick = () => {
      setIsEditMode(true);
      console.log("button clickeed",isEditMode);
   
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
      {/* <MDBCardBody>
        {SampleData.map((item, index) => (
          <div key={index}>
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>{item.label}</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                <MDBCardText className="text-muted">{item.value}</MDBCardText>
              </MDBCol>
            </MDBRow>
            <hr />
          </div>
        ))}
      </MDBCardBody> */}
      <MDBCardBody>
        {Object.entries(editableData).map(([label,value],index) =>(
          <div key ={index}>
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
                    onChange={(e)=>handleInputChange(label,e.target.value)}
                    />
                  ):(
                    <MDBCardText className='=text-muted'>{value}</MDBCardText>
                  )
                }
                </MDBCol>
              
              </MDBRow>
            <hr/>
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
    <MDBBtn className='me-8 m-3' color='success' size='lg'onClick={handleViewEmployees}>
      View Employees
    </MDBBtn>
    <MDBBtn className='me-8 m-3' color='success' size='lg' onClick={handleClick}>
      Add Employee
    </MDBBtn>
    <MDBBtn  className ="me-8 m-3"color='success' onClick={handleEditClick} size='lg'>
      Edit Details
    </MDBBtn>
  </div>
        </MDBContainer>
    
      </section>
    );
  }