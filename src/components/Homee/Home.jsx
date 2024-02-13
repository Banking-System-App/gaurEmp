import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

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
} from "mdb-react-ui-kit";

export default function Home() {
  const { user } = useAuth();
  console.log("User At home is ", user);

  const navigate = useNavigate();

  const addCompany = () => {
    navigate("/addcompany");
  };

  const getCompany = () => {
    navigate("/getcompany");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        {/* <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
              <MDBBtn className="ms-auto m-3" color='success' size='lg'>
       Salary Process Edit 
      </MDBBtn>
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow> */}

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {/* <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '165px' }}
                  fluid /> */}
                <h1>hi</h1>
                <p className="text-muted mb-1">{user.name}</p>
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
                    <MDBCardText>Email </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Contact No.</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-center mb-3">
          <MDBBtn
            className="me-8 m-3"
            color="success"
            size="lg"
            onClick={getCompany}
          >
            Get Company
          </MDBBtn>
          <MDBBtn
            className="me-8 m-3"
            color="danger"
            size="lg"
            onClick={addCompany}
          >
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
