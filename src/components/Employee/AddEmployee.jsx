import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyData } from "../../context/CompanyContext";
import { toast, ToastContainer } from "react-toastify";
import employeeApis from "../../database/EmployeeAPIs";

export default function AddEmployeeForm() {
  const { CompanyDetails } = useCompanyData();
  const navigate = useNavigate();

  const [employeeInfo, setEmployeeInfo] = useState({
    empID: "",
    name: "",
    gender: "Male",
    dob: "",
    maritalStatus: "Married",
    location: "",
    designation: "",
    doj: "",
    pTax: "",
    intlWFlag: "0",
    isPfFlag: "0",
    pfNumber: "",
    isPenFlag: "0",
    doMember: "",
    isEsFlag: "0",
    esCode: "",
    lwfFlag: "0",
    dol: "",
    reason: "",
    pf10: "",
    uanNumber: "",
    aadharNumber: "",
    pan: "",
    mobileNo: "",
    payment: "",
    bank: "",
    account: "",
    fatherName: "",
    husbandName: "",
    motherMaidenName: "",
    localAddress: "",
    sosContact: "",
    permanentAddress: "",
    compName: "",
    compId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/companyprofile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    employeeApis
      .createEmployee(
        employeeInfo.empID,
        employeeInfo.name,
        employeeInfo.gender,
        employeeInfo.dob,
        employeeInfo.maritalStatus,
        employeeInfo.location,
        employeeInfo.designation,
        employeeInfo.doj,
        employeeInfo.pTax,
        employeeInfo.intlWFlag,
        employeeInfo.isPfFlag,
        employeeInfo.pfNumber,
        employeeInfo.isPenFlag,
        employeeInfo.doMember,
        employeeInfo.isEsFlag,
        employeeInfo.esCode,
        employeeInfo.lwfFlag,
        employeeInfo.dol,
        employeeInfo.reason,
        employeeInfo.pf10,
        employeeInfo.uanNumber,
        employeeInfo.aadharNumber,
        employeeInfo.pan,
        employeeInfo.mobileNo,
        employeeInfo.payment,
        employeeInfo.bank,
        employeeInfo.account,
        employeeInfo.fatherName,
        employeeInfo.husbandName,
        employeeInfo.motherMaidenName,
        employeeInfo.localAddress,
        employeeInfo.sosContact,
        employeeInfo.permanentAddress,
        // employeeInfo.compName,
        // employeeInfo.compId,
        CompanyDetails.name,
        CompanyDetails.company_id
      )
      .then((response) => {
        if (response === false) {
          toast.error("Employee Creation Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          toast.success("Added Successfuly !", {
            theme: "light",
            autoClose: 1000,
          });
        }

        //Navigate after the toast is shown
        setTimeout(() => {
          navigate("/companyprofile");
        }, 2000);
      });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Add Employee</h1>

        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="empID" className="form-label">
              Emp ID
            </label>
            <input
              type="text"
              className="form-control"
              id="empID"
              name="empID"
              value={employeeInfo.empID}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={employeeInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={employeeInfo.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="dob" className="form-label">
              DOB
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={employeeInfo.dob}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="maritalStatus" className="form-label">
              Marital Status
            </label>
            <select
              className="form-control"
              id="maritalStatus"
              name="maritalStatus"
              value={employeeInfo.maritalStatus}
              onChange={handleChange}
            >
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={employeeInfo.location}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <input
              type="text"
              className="form-control"
              id="designation"
              name="designation"
              value={employeeInfo.designation}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="doj" className="form-label">
              DOJ
            </label>
            <input
              type="date"
              className="form-control"
              id="doj"
              name="doj"
              value={employeeInfo.doj}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="pTax" className="form-label">
              P Tax
            </label>
            <input
              type="number"
              className="form-control"
              id="pTax"
              name="pTax"
              value={employeeInfo.pTax}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="intlWFlag" className="form-label">
              Intl W Flag
            </label>
            <select
              className="form-control"
              id="intlWFlag"
              name="intlWFlag"
              value={employeeInfo.intlWFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="isPfFlag" className="form-label">
              IS PF Flag
            </label>
            <select
              className="form-control"
              id="isPfFlag"
              name="isPfFlag"
              value={employeeInfo.isPfFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
            {/* <input
              type="text"
              className="form-control"
              id="isPfFlag"
              
              value={employeeInfo.isPfFlag}
              onChange={handleChange}
            /> */}
          </div>
          <div className="col-md-4">
            <label htmlFor="pfNumber" className="form-label">
              PF Number
            </label>
            <input
              type="text"
              className="form-control"
              id="pfNumber"
              name="pfNumber"
              value={employeeInfo.pfNumber}
              onChange={handleChange}
              disabled={employeeInfo.isPfFlag !== "1"}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="isPenFlag" className="form-label">
              IS Pen Flag
            </label>
            <select
              className="form-control"
              id="isPenFlag"
              name="isPenFlag"
              value={employeeInfo.isPenFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="doMember" className="form-label">
              DO Member
            </label>
            <input
              type="text"
              className="form-control"
              id="doMember"
              name="doMember"
              value={employeeInfo.doMember}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="isEsFlag" className="form-label">
              IS ES Flag
            </label>
            <select
              className="form-control"
              id="isEsFlag"
              name="isEsFlag"
              value={employeeInfo.isEsFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="esCode" className="form-label">
              ES Code
            </label>
            <input
              type="text"
              className="form-control"
              id="esCode"
              name="esCode"
              value={employeeInfo.esCode}
              onChange={handleChange}
              disabled={employeeInfo.isEsFlag !== "1"}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="lwfFlag" className="form-label">
              LWF Flag
            </label>
            <select
              className="form-control"
              id="lwfFlag"
              name="lwfFlag"
              value={employeeInfo.lwfFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="dol" className="form-label">
              DOL
            </label>
            <input
              type="date"
              className="form-control"
              id="dol"
              name="dol"
              value={employeeInfo.dol}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <input
              type="text"
              className="form-control"
              id="reason"
              name="reason"
              value={employeeInfo.reason}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="pf10" className="form-label">
              PF 10
            </label>
            <input
              type="text"
              className="form-control"
              id="pf10"
              name="pf10"
              value={employeeInfo.pf10}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="uanNumber" className="form-label">
              UAN Number
            </label>
            <input
              type="text"
              className="form-control"
              id="uanNumber"
              name="uanNumber"
              value={employeeInfo.uanNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="aadharNumber" className="form-label">
              Aadhar Number
            </label>
            <input
              type="number"
              className="form-control"
              id="aadharNumber"
              name="aadharNumber"
              value={employeeInfo.aadharNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="pan" className="form-label">
              PAN
            </label>
            <input
              type="text"
              className="form-control"
              id="pan"
              name="pan"
              value={employeeInfo.pan}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="mobileNo" className="form-label">
              Mobile No
            </label>
            <input
              type="number"
              className="form-control"
              id="mobileNo"
              name="mobileNo"
              value={employeeInfo.mobileNo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="payment" className="form-label">
              Payment
            </label>
            <input
              type="number"
              className="form-control"
              id="payment"
              name="payment"
              value={employeeInfo.payment}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="bank" className="form-label">
              Bank
            </label>
            <input
              type="text"
              className="form-control"
              id="bank"
              name="bank"
              value={employeeInfo.bank}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="account" className="form-label">
              Account
            </label>
            <input
              type="number"
              className="form-control"
              id="account"
              name="account"
              value={employeeInfo.account}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="fatherName" className="form-label">
              Father Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fatherName"
              name="fatherName"
              value={employeeInfo.fatherName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="husbandName" className="form-label">
              Husband Name
            </label>
            <input
              type="text"
              className="form-control"
              id="husbandName"
              name="husbandName"
              value={employeeInfo.husbandName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="motherMaidenName" className="form-label">
              Mother Maiden Name
            </label>
            <input
              type="text"
              className="form-control"
              id="motherMaidenName"
              name="motherMaidenName"
              value={employeeInfo.motherMaidenName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="localAddress" className="form-label">
              Local Address
            </label>
            <input
              type="text"
              className="form-control"
              id="localAddress"
              name="localAddress"
              value={employeeInfo.localAddress}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="sosContact" className="form-label">
              SOS Contact
            </label>
            <input
              type="number"
              className="form-control"
              id="sosContact"
              name="sosContact"
              value={employeeInfo.sosContact}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="permanentAddress" className="form-label">
              Permanent Address
            </label>
            <input
              type="text"
              className="form-control"
              id="permanentAddress"
              name="permanentAddress"
              value={employeeInfo.permanentAddress}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 text-center">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="cancel"
              className="btn btn-success"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
