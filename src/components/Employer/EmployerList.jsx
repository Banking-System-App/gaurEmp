import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function EmployerList() {
    const data=[
        {
        "Company":"Abhishek",
        "Address":"Mumbai",
        "PAN":"ABH1234",
        "EMPCount":"50"
        },
        {
        "Company":"hrituraj",
        "Address":"Mumbai",
        "PAN":"ABH1234",
        "EMPCount":"50"
        }
    ]
    
    
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
        
          <tr key={index}>
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