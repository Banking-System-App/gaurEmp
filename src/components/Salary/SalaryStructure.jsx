import { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
} from 'mdb-react-ui-kit';

export default function EmpSalary() {
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [viewSalaryClicked, setViewSalaryClicked] = useState(false);
  const [editDetailsClicked, setEditDetailsClicked] = useState(false);

  const fetchedSalaryDetails = {
    month: selectedMonth,
    basicSalary: 15000,
    salaryType: 'XYZ',
    hra: 1500,
    da: 8266,
    dateOfSlip: '12/10/2020',
    tax: '10%',
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleViewSalary = () => {
    setViewSalaryClicked(true);
    // Fetch and set the salary structure based on selectedMonth and selectedYear
    // Replace the following example with your actual API call or data fetching logic
    
    setSalaryDetails(fetchedSalaryDetails);
  };
  const [editableData,setEditableData]=useState({ ...fetchedSalaryDetails});
  const [isEditMode,setIsEditMode]=useState(false);



  const handleEditDetails = () => {
    setEditDetailsClicked(true);
    setIsEditMode(true);
    // Implement logic to navigate to the edit details page or show an edit modal
  };
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
    setEditableData({ ...fetchedSalaryDetails });
    setIsEditMode(false);
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
              <MDBBreadcrumbItem className='text-center'>
                <h1>Salary Structure</h1>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        {/* Dropdown for Month and Year */}
        <MDBRow className="d-flex justify-content-center mb-4">
          <MDBCol md="2">
            <select
              className="form-select"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {/* Options for all months */}
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </MDBCol>

          <MDBCol md="2">
            <select
              className="form-select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {/* Options for the years you want to include */}
              {[...Array(10)].map((_, index) => (
                <option key={index} value={new Date().getFullYear() + index}>
                  {new Date().getFullYear() + index}
                </option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>

        {/* Display the salary structure based on selectedMonth and selectedYear */}
        <MDBRow className="d-flex justify-content-center">
          <MDBCol lg="8">
            {viewSalaryClicked && (
              <MDBCard className="mb-4">
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
            )}
          </MDBCol>
        </MDBRow>

        <div className="d-flex justify-content-center mb-3">
          <MDBBtn
            onClick={handleViewSalary}
            className='me-8 m-3'
            color='success'
            size='lg'
            // disabled={viewSalaryClicked}
          >
            View Salary Structure
          </MDBBtn>
          <MDBBtn
            onClick={handleEditDetails}
            className='me-8 m-3'
            color='success'
            size='lg'
            // disabled={editDetailsClicked}
          >
            Edit Details
          </MDBBtn>
        </div>
      </MDBContainer>
    </section>
  );
}