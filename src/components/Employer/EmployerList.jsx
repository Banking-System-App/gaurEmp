import React, {useState, useEffect} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { employerApi } from '../../database/employerApi';

export default function EmployerList() {
    const data=[
        {
        "Company":"Abhi ka Dhaba",
        "Address":"Mumbai",
        "PAN":"ABH1234",
        "EMPCount":"50"
        }
       
    ]
    const navigate = useNavigate();

    const handleClick1 = () => {
      navigate('/employerprofile');
    }

    const [employers, setEmployers] = useState([]);
    //**********************@@@@####
    //ye do bar chal rha hai
    //**********************@@@@####
    useEffect(() => {
      const fetchEmployerByAgentId = async () => {
        try {
          const compEmployees = await employerApi.getAllEmployerByUserId('Loacl').then((response) => {
            console.log("lod",response)
                    setEmployers(response);
                })
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEmployerByAgentId();
    }, []);

    console.log("loduuuuuu = ", employers);
    
  return (
    <MDBTable align='middle' hover>
  <MDBTableHead>
    <tr>
      <th scope='col'>Employer ID</th>
      <th scope='col'>Address</th>
      <th scope='col'>PAN</th>
      <th scope='col'>EMPCount</th>
    </tr>
  </MDBTableHead>
  <MDBTableBody>
     
    {employers.map((emps, index) => (
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
              <p className='fw-bold mb-1'>{emps.employer_id}</p>
              <p className='text-muted mb-0'>{emps.Address}</p>
            </div>
          </div>
        </td>
        <td>
          {/* Include your content for the second column here */}
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
  </MDBTableBody>
</MDBTable>

  );
}