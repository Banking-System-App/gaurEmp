import React, { useState } from 'react';
import { salaryApi } from '../../database/salaryApi';
import { useNavigate } from 'react-router-dom';
import { useEmployeeData } from '../../context/EmployeeContext';

export default function AddSalaryStructure() {
  const { EmployeeDetails } = useEmployeeData();
  console.log("Employee Detail is : ", EmployeeDetails);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    "Employee Type": '',
    BasicSalary: '',
    "DA": '',
    "HRA": '',
    "Convayance": '',
    WashingAllowance: '',
    MedicalAllowance: '',
    OtherAllowance: '',
    "Year": '',
    "Month": ''
  });

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (label, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleNext = () => {
    if (selectedMonth && selectedYear) {
      setShowForm(true);
    } else {
      alert('Please select both month and year.');
    }
  };

  const handleSave = () => {
    // Add logic to save the form data
    console.log('Form Data:', formData);
    console.log('Emplyee id in add salary structure:', EmployeeDetails.$id);
    console.log('Emplyee whole in add salary structure:', EmployeeDetails);

    salaryApi.createSalaryStrcture(
      EmployeeDetails.$id,
      EmployeeDetails.emp_name,
      formData.EmployeeType,
      EmployeeDetails.comp_id,
      formData.BasicSalary,
      formData.DA,
      formData.HRA,
      formData.Convayance,
      formData.WashingAllowance,
      formData.MedicalAllowance,
      formData.OtherAllowance,
      formData.Year,
      formData.Month,
    );
    alert(`Salary Structure for employee ID ${EmployeeDetails.name} Added Successfully`);
    navigate('/salarystructure');
    // You can make an API call to save the data or perform other actions
  };

  // Generate options for months
  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: (index + 1).toString().padStart(2, '0'),
    label: new Date(0, index).toLocaleString('default', { month: 'long' })
  }));

  // Generate options for years (adjust the range as needed)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    value: (currentYear - index).toString(),
    label: (currentYear - index).toString()
  }));

  const handleCancel = () => {
    navigate('/companyprofile')
  } 

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col">
          <div className="card mb-4">
            <div className="card-body ">
              <h2 className="mb-4 ">Add Salary Structure</h2>
              <p className="text-danger ">To add salary structures later, update them from the employee list.</p>
              <div className="row mb-3 ">
                <div className="col text-center">
                  <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {monthOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <button className="btn btn-primary" onClick={handleNext}>Next</button>
                </div>
              </div>
              {showForm && (
               
                <div className="row">
                  <hr/>
                  <hr/>
                   <h4>Add Salary Structure for {selectedMonth} / {selectedYear}</h4>
                  <br/>
                  <br/>
                  {Object.entries(formData).map(([label, value]) => (
                    label !== "Month" && label !== "Year" && (
                      <div key={label} className="col-sm-4 mb-3">
                        <label className="form-label">{label}</label>
                        <input
                          type='text'
                          className='form-control'
                          value={value}
                          onChange={(e) => handleInputChange(label, e.target.value)}
                        />
                      </div>
                    )
                  ))}
                  <div className="col-sm-12">
                    <button className='btn btn-success me-8 m-3' onClick={handleSave}>
                      Save
                    </button>
                    <button className='btn btn-danger me-8 m-3' onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
