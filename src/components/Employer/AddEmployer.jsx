import React, { useState } from 'react';
import { employerApi } from '../../database/employerApi'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';

const AddEmployerForm = () => {
  const [employerInfo, setEmployerInfo] = useState({
    employerId: '',
    employerName: '',
    employerAddress: '',
    pfMemberFlag: '',
    pfCode: '',
    group: '',
    pfLimit: '',
    esMemberFlag: '',
    esiCode: '',
    locationOffice: '',
    lwfFlag: '',
    lwfCode: '',
    otPayableFlag: '',
    otRate: '',
    panNum: '',
    tanNum: '',
    agenId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await employerApi.createEmployer(
      employerInfo.employerId,
      employerInfo.employerName,
      employerInfo.employerAddress,
      employerInfo.pfMemberFlag,
      employerInfo.pfCode,
      employerInfo.group,
      employerInfo.pfLimit,
      employerInfo.esMemberFlag,
      employerInfo.esiCode,
      employerInfo.locationOffice,
      employerInfo.lwfFlag,
      employerInfo.lwfCode,
      employerInfo.otPayableFlag,
      employerInfo.otRate,
      employerInfo.panNum,
      employerInfo.tanNum,
      "Loacl"
    )
    // You can add logic here to send the data to your backend or perform other actions
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <h1 className="text-center mb-4">Add Employer</h1>
          </MDBCol>
        </MDBRow>

        <form onSubmit={handleSubmit}>
          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Employer id"
                type="text"
                name="employerId"
                value={employerInfo.employerId}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Name"
                type="text"
                name="employerName"
                value={employerInfo.employerName}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Address"
                type="text"
                name="employerAddress"
                value={employerInfo.employerAddress}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="PF MemberFlag"
                type="text"
                name="pfMemberFlag"
                value={employerInfo.pfMemberFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="PF Code"
                type="text"
                name="pfCode"
                value={employerInfo.pfCode}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Group"
                type="text"
                name="group"
                value={employerInfo.group}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="PF Limit"
                type="text"
                name="pfLimit"
                value={employerInfo.pfLimit}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="ES Member Flag"
                type="text"
                name="esMemberFlag"
                value={employerInfo.esMemberFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="ESI Code"
                type="text"
                name="esiCode"
                value={employerInfo.esiCode}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="L Office"
                type="text"
                name="lOffice"
                value={employerInfo.lOffice}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="LWF Flag"
                type="text"
                name="lwfFlag"
                value={employerInfo.lwfFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="LWF Code"
                type="text"
                name="lwfCode"
                value={employerInfo.lwfCode}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="OT Payable Flag"
                type="text"
                name="otPayableFlag"
                value={employerInfo.otPayableFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="OT Rate"
                type="text"
                name="otRate"
                value={employerInfo.otRate}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="PAN No"
                type="text"
                name="panNo"
                value={employerInfo.panNo}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="TAN No"
                type="text"
                name="tanNo"
                value={employerInfo.tanNo}
                onChange={handleChange}
              />
            </MDBCol>
            {/* Add similar MDBInput components for other data points */}
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol>
              <MDBBtn type="submit" color="success">
                Submit
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    </section>
  );
}

export default AddEmployerForm
