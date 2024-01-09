import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function EmployeesList() {
    const data=[
        {
          "EmpID":"1",
          "EmpName":"Sunny",
          "EmployeEmail":"sunny@gmail.com",
          "Aadhar":"6969696"
                     
        },
        {
          "EmpID":"1",
          "EmpName":"Daniel",
          "EmployeEmail":"Daniel@gmail.com",
          "Aadhar":"6969696"
        }
    ]
    
    
  return (
    <MDBTable align='middle' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>EmpID</th>
          <th scope='col'>EmpName</th>
          <th scope='col'>EmployeEmail</th>
          <th scope='col'>Aadhar</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((employee, index) => (
        
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
                <p className='fw-bold mb-1'>{employee.EmpID}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{employee.EmpName}</p>
          </td>
          <td>
          <p className='fw-normal mb-1'>{employee.EmployeEmail}</p>
          </td>
          <td>
          <p className='fw-normal mb-1'>{employee.Aadhar}</p>
          </td>
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




// import React from 'react';

// function EmpList() {
//     return (
//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//              th>Emp.ID</th>
//               <th>Emp.Name</th>
//               <th>Date Of Birth</th>
//               <th>Location</th>
//               <th>Gender</th>
//               <th>Date Of Joining</th> <
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>John Doe</td>
//               <td>1990-01-01</td>
//               <td>New York</td>
//               <td>Male</td>
//               <td>2021-01-01</td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Jane Smith</td>
//               <td>1988-05-15</td>
//               <td>London</td>
//               <td>Female</td>
//               <td>2019-03-10</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td>Michael Johnson</td>
//               <td>1995-08-20</td>
//               <td>San Francisco</td>
//               <td>Male</td>
//               <td>2022-02-15</td>
//             </tr>
//             <tr>
//               <td>4</td>
//               <td>Emily Davis</td>
//               <td>1987-11-12</td>
//               <td>Paris</td>
//               <td>Female</td>
//               <td>2017-07-05</td>
//             </tr>
//             <tr>
//               <td>5</td>
//               <td>Christopher Wilson</td>
//               <td>1992-03-28</td>
//               <td>Tokyo</td>
//               <td>Male</td>
//               <td>2020-09-12</td>
//             </tr>
//             <tr>
//               <td>6</td>
//               <td>Samantha Turner</td>
//               <td>1989-07-08</td>
//               <td>Sydney</td>
//               <td>Female</td>
//               <td>2018-11-25</td>
//             </tr>
//             <tr>
//               <td>7</td>
//               <td>Andrew Thompson</td>
//               <td>1994-12-03</td>
//               <td>Berlin</td>
//               <td>Male</td>
//               <td>2016-06-18</td>
//             </tr>
//             <tr>
//               <td>8</td>
//               <td>Olivia Martin</td>
//               <td>1986-09-17</td>
//               <td>Rio de Janeiro</td>
//               <td>Female</td>
//               <td>2015-04-02</td>
//             </tr>
//             <tr>
//               <td>9</td>
//               <td>Daniel White</td>
//               <td>1998-04-09</td>
//               <td>Moscow</td>
//               <td>Male</td>
//               <td>2014-10-15</td>
//             </tr>
//             <tr>
//               <td>10</td>
//               <td>Ava Rodriguez</td>
//               <td>1991-06-22</td>
//               <td>Seoul</td>
//               <td>Female</td>
//               <td>2013-12-28</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
  
//   export default EmpList;
  
