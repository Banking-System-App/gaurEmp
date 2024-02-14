import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import companyApis from "../../database/CompanyAPIs";

const AddCompanyForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState({
    companyId: "",
    companyName: "",
    companyAddress: "",
    pfMemberFlag: "0",
    pfCode: "",
    group: "",
    pfLimit: "",
    esMemberFlag: "0",
    esiCode: "",
    locationOffice: "",
    lwfFlag: "0",
    lwfCode: "",
    otPayableFlag: "0",
    otRate: "",
    panNum: "",
    tanNum: "",
    agenId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    companyApis
      .createCompany(
        companyInfo.companyId,
        companyInfo.companyName,
        companyInfo.companyAddress,
        companyInfo.pfMemberFlag,
        companyInfo.pfCode,
        companyInfo.group,
        companyInfo.pfLimit,
        companyInfo.esMemberFlag,
        companyInfo.esiCode,
        companyInfo.locationOffice,
        companyInfo.lwfFlag,
        companyInfo.lwfCode,
        companyInfo.otPayableFlag,
        companyInfo.otRate,
        companyInfo.panNum,
        companyInfo.tanNum,
        user.$id
      )
      .then((response) => {
        if (response === false) {
          toast.error("Company Creation Failed !", {
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
          navigate("/");
        }, 2000);
      });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Add Company</h1>

        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="companyId" className="form-label">
              Company id
            </label>
            <input
              type="text"
              className="form-control"
              id="companyId"
              name="companyId"
              value={companyInfo.companyId}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="companyName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={companyInfo.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="companyAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="companyAddress"
              name="companyAddress"
              value={companyInfo.companyAddress}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="pfMemberFlag" className="form-label">
              PF MemberFlag
            </label>
            <select
              className="form-control"
              id="pfMemberFlag"
              name="pfMemberFlag"
              value={companyInfo.pfMemberFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="pfCode" className="form-label">
              PF Code
            </label>
            <input
              type="text"
              className="form-control"
              id="pfCode"
              name="pfCode"
              value={companyInfo.pfCode}
              onChange={handleChange}
              disabled={companyInfo.pfMemberFlag !== "1"}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="group" className="form-label">
              Group
            </label>
            <input
              type="text"
              className="form-control"
              id="group"
              name="group"
              value={companyInfo.group}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="pfLimit" className="form-label">
              PF Limit
            </label>
            <input
              type="text"
              className="form-control"
              id="pfLimit"
              name="pfLimit"
              value={companyInfo.pfLimit}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="esMemberFlag" className="form-label">
              ES Member Flag
            </label>
            <select
              className="form-control"
              id="esMemberFlag"
              name="esMemberFlag"
              value={companyInfo.esMemberFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="esiCode" className="form-label">
              ESI Code
            </label>
            <input
              type="text"
              className="form-control"
              id="esiCode"
              name="esiCode"
              value={companyInfo.esiCode}
              onChange={handleChange}
              disabled={companyInfo.esMemberFlag !== "1"}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="locationOffice" className="form-label">
              Location Office
            </label>
            <input
              type="text"
              className="form-control"
              id="locationOffice"
              name="locationOffice"
              value={companyInfo.locationOffice}
              onChange={handleChange}
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
              value={companyInfo.lwfFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="lwfCode" className="form-label">
              LWF Code
            </label>
            <input
              type="text"
              className="form-control"
              id="lwfCode"
              name="lwfCode"
              value={companyInfo.lwfCode}
              onChange={handleChange}
              disabled={companyInfo.lwfFlag !== "1"}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="otPayableFlag" className="form-label">
              OT Payable Flag
            </label>
            <select
              className="form-control"
              id="otPayableFlag"
              name="otPayableFlag"
              value={companyInfo.otPayableFlag}
              onChange={handleChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="otRate" className="form-label">
              OT Rate
            </label>
            <input
              type="text"
              className="form-control"
              id="otRate"
              name="otRate"
              value={companyInfo.otRate}
              onChange={handleChange}
              disabled={companyInfo.otPayableFlag !== "1"}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="panNum" className="form-label">
              PAN No
            </label>
            <input
              type="text"
              className="form-control"
              id="panNum"
              name="panNum"
              value={companyInfo.panNum}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="tanNum" className="form-label">
              TAN No
            </label>
            <input
              type="text"
              className="form-control"
              id="tanNum"
              name="tanNum"
              value={companyInfo.tanNum}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="cancel"
              className="btn btn-danger"
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
};

export default AddCompanyForm;
