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
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeApi } from '../../database/employeeApi';

export default function EmployeeProfile() {
const navigate = useNavigate()

const handleClick = () => {
  navigate('/salarystructure');
  alert(' salarystructure button clicked');
}

const handleSalaryProcess = () => {
  navigate('/salaryprocess');
  alert('salaryprocess button clicked');
}

//call api call and set into intial data

  const [employee, setEmployee] = useState([]);

  const [editableData,setEditableData]=useState({ ...employee[0]});
  const [isEditMode,setIsEditMode]=useState(false);


  

  useEffect(() => {
    const getEmployeeDetail = async () => {
      try {
        await employeeApi.getEmployeeDetail('ramRajya',"1001").then((response)=>{
          console.log('Employee Profile is ', response);
          setEmployee(response);
          setEditableData(response[0])
        });
        
      } catch (error) {
        console.error(error);
      }
    }
    getEmployeeDetail();
  }, []);


  const handleInputChange = (label, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };
  const handleSave = () => {
    // Implement logic to save the edited data (e.g., send to backend)
    console.log('Edited Data on save:', editableData);
    employeeApi.updateEmployeeData(editableData.$id, editableData)
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    console.log("button clickeed",isEditMode);
 
  };
  const handleCancelEdit = () => {
    setEditableData({ ...employee[0] });
    setIsEditMode(false);
  };




  console.log('Edited Data latest:', editableData);

  console.log('Employee data latest:', employee[0]);


  const changelabel ={
    emp_id: "empId",
    emp_name: "empName",
    gender: "gender",
    dob: "dob",
    marital_status: "maritalStatus",
    location: "location",
    designation: "designation",
    date_of_joining: "dateOfJoining",
    professional_tax: "professionalTax",
    intl_w_flag: "intlWFlag",
    pf_flag: "pfFlag",
    pf_number: "pfNum",
    pen_flag: "penFlag",
    d_o_member: "dateOfMember",
    es_flag: "esFlag",
    es_code: "esCode",
    lwf_flag: "lwfFlag",
    dol: "dateOfLeave",
    reason: "reason",
    pf_10: "pf10",
  }



  

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
     
      <MDBRow>
  <MDBCol>
    <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
      <MDBBtn className="ms-auto m-3" color='success' size='lg' onClick={handleSalaryProcess}>
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
        (changelabel[label]!=null && changelabel[label]!="")?

        <div key ={index}>
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>{changelabel[label]}</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                {isEditMode ? (
                  <input
                  type='text'
                  className='form-control'
                  value={value}
                  onChange={(e)=>handleInputChange(label,e.target.value)}
                  />
                ):
                  <MDBCardText className='=text-muted'>{value}</MDBCardText>
              }
              </MDBCol>
            
            </MDBRow>
          <hr/>
        </div>
        :<></>

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
  
  <MDBBtn className='me-8 m-3' color='success' size='lg' onClick={handleClick}>
    Salary Structure
  </MDBBtn>
  <MDBBtn  className ="me-8 m-3"color='success' onClick={handleEditClick} size='lg'>
    Edit Details
  </MDBBtn>
</div>
      </MDBContainer>
  
    </section>
  );
}