import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { employerApi } from '../../database/employerApi';
import { useAuth } from '../../utils/AuthContext';
import { useEmployerData } from '../../context/EmployerContext';

export default function EmployerList() {
  const { user } = useAuth();

  const { setEmployerDataValue } = useEmployerData();
  const navigate = useNavigate();

  const handleEmpDetailClick = (employerData) => {
    console.log("emps data is, ", employerData);
    setEmployerDataValue(employerData);
    navigate('/employerprofile');
  };
  const [employers, setEmployers] = useState([]);
  //**********************@@@@####
  //ye do bar chal rha hai
  //**********************@@@@####
  useEffect(() => {
    const fetchEmployerByAgentId = async () => {
      try {
        const compEmployees = await employerApi.getAllEmployerByUserId(user.$id).then((response) => {
          console.log("lod", response)
          setEmployers(response);
        })

      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployerByAgentId();
  }, []);

  return (
    <MDBTable align='middle' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Employer ID</th>
          <th scope='col'>Name</th>
          <th scope='col'>Address</th>
          <th scope='col'>EMPCount</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>

        {employers.map((emps, index) => (
          <tr key={index} onClick={()=>handleEmpDetailClick(emps)}>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{emps.employer_id}</p>


                  {/* <p className='text-muted mb-0'>{emps.Address}</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-bold mb-1'>{emps.name}</p>
            </td>
            <td>
              <p className='fw-bold mb-1'>{emps.employer_address}</p>
            </td>
            <td>Senior</td>
            <td>

            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>

  );
}