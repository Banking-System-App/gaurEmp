import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <form onSubmit={handleSubmit}>
            <MDBInput id="name" type="text" required >Name</MDBInput>
            <MDBInput label="Email" id="email" type="email" required />
            <MDBInput label="Phone No" id="phone" type="tel" required />
            <MDBInput type="textarea" label="Description" id="description" rows="6" required />

            <MDBBtn color="primary" type="submit">
              Submit
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ContactForm;