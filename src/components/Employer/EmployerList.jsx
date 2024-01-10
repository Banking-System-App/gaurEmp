import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
export default function EmployerList() {
    const data=[
        {
        "Company":"Abhi ka Dhaba",
        "Address":"Mumbai",
        "PAN":"ABH1234",
        "EMPCount":"50"
        },
        {
        "Company":"Pragati.AI",
        "Address":"Allahabad",
        "PAN":"Hritu@123",
        "EMPCount":"50"
        },
        {
          "Company":"HrituRaj VLSI",
          "Address":"Allahabad",
          "PAN":"Birji@123",
          "EMPCount":"50"
          }
    ]
    
    const navigate = useNavigate();

    const handleClick1 = () => {
      navigate('/employerprofile');
      alert("Clicked");
    }
    
  return (
    <MDBTable align='middle' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Company</th>
          <th scope='col'>Address</th>
          <th scope='col'>PAN</th>
          <th scope='col'>EMPCount</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((company, index) => (

          <tr key={index} onClick={handleClick1}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{company.Company}</p>
                <p className='text-muted mb-0'>{company.Address}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{company.PAN}</p>
            <p className='text-muted mb-0'>{company.EMPCount}</p>
          </td>
          <td>
            <MDBBadge color='success' pill>
              Active
            </MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
          </tr>
       
        ))}
         <tr>
            
         
        </tr> 
       
      </MDBTableBody>
    </MDBTable>
  );
}