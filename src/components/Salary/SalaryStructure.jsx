import  { useState } from 'react';
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
  const [selectedDate, setSelectedDate] = useState(1);
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [viewSalaryClicked, setViewSalaryClicked] = useState(false);
  const [editDetailsClicked, setEditDetailsClicked] = useState(false);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    const daysInMonth = getDaysInMonth(event.target.value, selectedYear);
    if (selectedDate > daysInMonth) {
      setSelectedDate(daysInMonth);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleDateChange = (event) => {
    setSelectedDate(parseInt(event.target.value, 10));
  };

  const handleViewSalary = () => {
    setViewSalaryClicked(true);
    // Fetch and set the salary structure based on selectedMonth, selectedYear, and selectedDate
    // Replace the following example with your actual API call or data fetching logic
    const fetchedSalaryDetails = {
      month: selectedMonth,
      basicSalary: 15000,
      salaryType: 'XYZ',
      hra: 1500,
      da: 8266,
      dateOfSlip: '12/10/2020',
      tax: '10%',
    };
    setSalaryDetails(fetchedSalaryDetails);
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    const leapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    const daysInMonthMap = {
      Jan: 31, Feb: (leapYear ? 29 : 28), Mar: 31, Apr: 30,
      May: 31, Jun: 30, Jul: 31, Aug: 31,
      Sep: 30, Oct: 31, Nov: 30, Dec: 31,
    };
    return daysInMonthMap[month];
  };

  const handleEditDetails = () => {
    setEditDetailsClicked(true);
    // Implement logic to navigate to the edit details page or show an edit modal
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

        {/* Dropdown for Month, Year, and Date */}
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

          <MDBCol md="2">
            <select
              className="form-select"
              value={selectedDate}
              onChange={handleDateChange}
            >
              {/* Options for all dates (1 to getDaysInMonth(selectedMonth)) */}
              {[...Array(getDaysInMonth(selectedMonth, selectedYear))].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>

        {/* Display the salary structure based on selectedMonth, selectedYear, and selectedDate */}
        <MDBRow className="d-flex justify-content-center">
          <MDBCol lg="8">
            {viewSalaryClicked && (
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Month</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.month}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Basic Salary</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.basicSalary}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Salary Type</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.salaryType}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>HRA</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.hra}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>DA</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.da}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Date Of Slip</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.dateOfSlip}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Tax</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{salaryDetails.tax}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
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
            disabled={viewSalaryClicked}
          >
            View Salary Structure
          </MDBBtn>
          <MDBBtn
            onClick={handleEditDetails}
            className='me-8 m-3'
            color='success'
            size='lg'
            disabled={editDetailsClicked}
          >
            Edit Details
          </MDBBtn>
        </div>
      </MDBContainer>
    </section>
  );
}


