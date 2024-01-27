import React, { useState } from 'react';
import { employerApi } from '../../database/employerApi';
import { useAuth } from '../../utils/AuthContext';

import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router';



const AddEmployerForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [employerInfo, setEmployerInfo] = useState({
    employerId: '',
    employerName: '',
    employerAddress: '',
    pfMemberFlag: '0',
    pfCode: '',
    group: '',
    pfLimit: '',
    esMemberFlag: '0',
    esiCode: '',
    locationOffice: '',
    lwfFlag: '0',
    lwfCode: '',
    otPayableFlag: '0',
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

  const handleCancel = () => {
    navigate('/');
  }

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
      user.$id
    );
    toast.success("Employeer Added !", {
      "theme":"light",
      "autoClose": 1000
    });

    navigate('/')
    // You can add logic here to send the data to your backend or perform other actions
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Add Employer</h1>

        <form  className="row g-3">
          <div className="col-md-4">
            <label htmlFor="employerId" className="form-label">
              Employer id
            </label>
            <input
              type="text"
              className="form-control"
              id="employerId"
              name="employerId"
              value={employerInfo.employerId}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="employerName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="employerName"
              name="employerName"
              value={employerInfo.employerName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="employerAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="employerAddress"
              name="employerAddress"
              value={employerInfo.employerAddress}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="pfMemberFlag" className="form-label">
              PF MemberFlag
            </label>
            <select className="form-control" id="pfMemberFlag" name="pfMemberFlag" value={employerInfo.pfMemberFlag} onChange={handleChange}>
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
              value={employerInfo.pfCode}
              onChange={handleChange}
              disabled= {employerInfo.pfMemberFlag!=="1"}
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
              value={employerInfo.group}
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
              value={employerInfo.pfLimit}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="esMemberFlag" className="form-label">
              ES Member Flag
            </label>
            <select className="form-control" id="esMemberFlag" name="esMemberFlag" value={employerInfo.esMemberFlag} onChange={handleChange}>
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
              value={employerInfo.esiCode}
              onChange={handleChange}
              disabled= {employerInfo.esMemberFlag!=="1"}
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
              value={employerInfo.locationOffice}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="lwfFlag" className="form-label">
              LWF Flag
            </label>
            <select className="form-control" id="lwfFlag" name="lwfFlag" value={employerInfo.lwfFlag} onChange={handleChange}>
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
              value={employerInfo.lwfCode}
              onChange={handleChange}
              disabled= {employerInfo.lwfFlag!=="1"}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="otPayableFlag" className="form-label">
              OT Payable Flag
            </label>
            <select className="form-control" id="otPayableFlag" name="otPayableFlag" value={employerInfo.otPayableFlag} onChange={handleChange}>
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
              value={employerInfo.otRate}
              onChange={handleChange}
              disabled= {employerInfo.otPayableFlag!=="1"}
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
              value={employerInfo.panNum}
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
              value={employerInfo.tanNum}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
            <button type="cancel" className="btn btn-danger" onClick = {handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AddEmployerForm;
