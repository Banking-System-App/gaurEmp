import React, { useState } from 'react';
import { employeeApi } from '../../database/employeeApi';
import { useNavigate } from 'react-router-dom';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';

export default function AddEmployeeForm() {

  const navigate = useNavigate()
  const [employeeInfo, setEmployeeInfo] = useState({
    empID: '',
    name: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    location: '',
    designation: '',
    doj: '',
    pTax: '',
    intlWFlag: '',
    isPfFlag: '',
    pfNumber: '',
    isPenFlag: '',
    doMember: '',
    isEsFlag: '',
    esCode: '',
    lwfFlag: '',
    dol: '',
    reason: '',
    pf10: '',
    uanNumber: '',
    aadharNumber: '',
    pan: '',
    mobileNo: '',
    payment: '',
    bank: '',
    account: '',
    fatherName: '',
    husbandName: '',
    motherMaidenName: '',
    localAddress: '',
    sosContact: '',
    permanentAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await employeeApi.createEmployee(
      employeeInfo.empID,
      employeeInfo.name,
      employeeInfo.gender,
      employeeInfo.dob,
      employeeInfo.maritalStatus,
      employeeInfo.location,
      employeeInfo.designation,
      employeeInfo.doj,
      employeeInfo.professionalTax,
      employeeInfo.intlWFlag,
      employeeInfo.isPfFlag,
      employeeInfo.pfNum,
      employeeInfo.isPenFlag,
      employeeInfo.doMember,
      employeeInfo.isEsFlag,
      employeeInfo.esCode,
      employeeInfo.lwfFlag,
      employeeInfo.dateOfLeave,
      employeeInfo.reason,
      employeeInfo.pf10,
      employeeInfo.uanNum,
      employeeInfo.aadharNumber,
      employeeInfo.panNum,
      employeeInfo.mobileNumber,
      employeeInfo.payment,
      employeeInfo.bank,
      employeeInfo.account,
      employeeInfo.fatherName,
      employeeInfo.husbandName,
      employeeInfo.motherMaidenName,
      employeeInfo.localAddress,
      employeeInfo.sosContact,
      employeeInfo.permanentAddress,
      employeeInfo.compName,
      employeeInfo.compId
    )
    alert("Employee Added Sucessfuly")
    navigate("/employerprofile")
    // You can add logic here to send the data to your backend or perform other actions
  };
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <h1 className="text-center mb-4">Add Employee</h1>
          </MDBCol>
        </MDBRow>

        <form onSubmit={handleSubmit}>
          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Emp ID"
                type="text"
                name="empID"
                value={employeeInfo.empID}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Name"
                type="text"
                name="name"
                value={employeeInfo.name}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Gender"
                type="text"
                name="gender"
                value={employeeInfo.gender}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="DOB"
                type="text"
                name="dob"
                value={employeeInfo.dob}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="M Status"
                type="text"
                name="maritalStatus"
                value={employeeInfo.maritalStatus}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Location"
                type="text"
                name="location"
                value={employeeInfo.location}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Designation"
                type="text"
                name="designation"
                value={employeeInfo.designation}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="DOJ"
                type="text"
                name="doj"
                value={employeeInfo.doj}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="P Tax"
                type="text"
                name="pTax"
                value={employeeInfo.pTax}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Intl W Flag"
                type="text"
                name="intlWFlag"
                value={employeeInfo.intlWFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="IS PF Flag"
                type="text"
                name="isPfFlag"
                value={employeeInfo.isPfFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="PF Number"
                type="text"
                name="pfNumber"
                value={employeeInfo.pfNumber}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="IS Pen Flag"
                type="text"
                name="isPenFlag"
                value={employeeInfo.isPenFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="DO Member"
                type="text"
                name="doMember"
                value={employeeInfo.doMember}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="IS ES Flag"
                type="text"
                name="isEsFlag"
                value={employeeInfo.isEsFlag}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="ES Code"
                type="text"
                name="esCode"
                value={employeeInfo.esCode}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="LWF Flag"
                type="text"
                name="lwfFlag"
                value={employeeInfo.lwfFlag}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="DOL"
                type="text"
                name="dol"
                value={employeeInfo.dol}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Reason"
                type="text"
                name="reason"
                value={employeeInfo.reason}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="PF 10"
                type="text"
                name="pf10"
                value={employeeInfo.pf10}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="UAN Number"
                type="text"
                name="uanNumber"
                value={employeeInfo.uanNumber}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Aadhar Number"
                type="text"
                name="aadharNumber"
                value={employeeInfo.aadharNumber}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="PAN"
                type="text"
                name="pan"
                value={employeeInfo.pan}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Mobile No"
                type="text"
                name="mobileNo"
                value={employeeInfo.mobileNo}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Payment"
                type="text"
                name="payment"
                value={employeeInfo.payment}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Bank"
                type="text"
                name="bank"
                value={employeeInfo.bank}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Account"
                type="text"
                name="account"
                value={employeeInfo.account}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Father Name"
                type="text"
                name="fatherName"
                value={employeeInfo.fatherName}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Husband Name"
                type="text"
                name="husbandName"
                value={employeeInfo.husbandName}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                label="Mother Maiden Name"
                type="text"
                name="motherMaidenName"
                value={employeeInfo.motherMaidenName}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol md="4">
              <MDBInput
                label="Local Address"
                type="text"
                name="localAddress"
                value={employeeInfo.localAddress}

                onChange={handleChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-4">
            <MDBCol md="6">
              <MDBInput
                label="SOS Contact"
                type="text"
                name="sosContact"
                value={employeeInfo.sosContact}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBInput
                label="Permanent Address"
                type="text"
                name="permanentAddress"
                value={employeeInfo.permanentAddress}
                onChange={handleChange}
              />
            </MDBCol>
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
