// import React from 'react';

// const Home = () => {
//   return (
//     <div className="container">
//       <h1>Employee Management</h1>
//       <p>This is the home page of the website</p>
//     </div>
//   );
// };

// export default Home;

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

export default function Home() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
     
      <MDBRow>
  <MDBCol>
    <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
      {/* <MDBBtn className="ms-auto m-3" color='success' size='lg'>
       Salary Process Edit 
      </MDBBtn> */}
      <MDBBreadcrumbItem>
        <a href='#'>Home</a>
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
                  style={{ width: '165px' }}
                  fluid />
                <p className="text-muted mb-1">Chacha</p>
                <p className="text-muted mb-4">Gaur ke Chacha Mumbai vale</p>
                {/* <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Chacha Email </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">chacha@gmail.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Chacha Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Male/Female</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> Chacha Date Of Birth</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">21-08-1989</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Chacha Location</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Mumbai</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Chacha Contect No.</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">8268455745</MDBCardText>
                  </MDBCol>
                </MDBRow>
                
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-center mb-3">
  <MDBBtn className='me-8 m-3' color='success' size='lg'>
    Get Company
  </MDBBtn>
  <MDBBtn className='me-8 m-3' color='success' size='lg'>
    Add Comapny
  </MDBBtn>
  {/* <MDBBtn  className ="me-8 m-3"color='success' size='lg'>
    Edit Details
  </MDBBtn> */}
</div>
      </MDBContainer>
  
    </section>
  );
}