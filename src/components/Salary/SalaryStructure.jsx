import React, { useState, useEffect } from 'react';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
} from 'mdb-react-ui-kit';

import { salaryApi } from '../../database/salaryApi';
import { useEmployerData } from '../../context/EmployerContext';
import { useEmployeeData } from '../../context/EmployeeContext';
import { salaryUtil } from '../../utils/SalaryUtil';


function EmployeeSalaryStructure() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [basic, setBasic] = useState('');
  const [da, setDa] = useState('');
  const [hra, setHra] = useState('');
  const [convayance, setConyayance] = useState('');
  const [washingAllowance, setWaDashingAllowance] = useState('');
  const [medicalAllowance, setMadicalAllowance] = useState('');
  const [otherAllowance, setOtherAllowance] = useState('');
  
  const [salaryStructures, setSalaryStructures] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMonthYear, setShowMonthYear] = useState(false);
  
  const [isEditMode,setIsEditMode]=useState(false);
  const [editableData, setEditableData] = useState(...salaryStructures)
  

  const {EmployerDetails} = useEmployerData();
  const {EmployeeDetails} = useEmployeeData();


  const fetchEmployeeSalaryByEmpId = async () => {
    try {
      await salaryApi.getSalaryStructuresByEmpId(EmployeeDetails.emp_id).then((response) => {
        console.log("", response[0]);
        setSalaryStructures((response));
        setEditableData(salaryUtil.updatedSalaryData(salaryUtil.sortedSalaryData(response)[0]))
      })


    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeeSalaryByEmpId();
  }, []);


  
  console.log("EDITABLE data of Str = ", editableData);

  const handleAddSalaryStructure = async(event) => {
    // setShowAddForm(true);
    event.preventDefault();
    
    try {
      await salaryApi.createSalaryStrcture(
        EmployeeDetails.emp_id,
        EmployeeDetails.emp_name,
        employeeType,
        EmployerDetails.employer_id,
        basic,
        da,
        hra,
        conveyance,
        washingAllowance,
        medicalAllowance,
        otherAllowance,
        selectedYear,
        selectedMonth
        ).then((res)=>{
          fetchEmployeeSalaryByEmpId();
        })
    } catch (error) {
      console.error(error);
    }
    setShowAddForm(false);
    setShowMonthYear(false);

  };

  const handleSelectMonthYear = () => {
    console.log('Selected Month:', selectedMonth);
    console.log('Selected Year:', selectedYear);
  };

  const handleAddSalClick = () => {
    setShowMonthYear(true)
  }

  const handleCancelAddSalaryStructure = () => {
    setShowAddForm(false);
    setShowMonthYear(false);
  }

  const handleAddNewClick = () => {
    setShowAddForm(true);
    setShowMonthYear(false);
  };

  const handleEditSalaryStructure = () => {
    
  }

  

  const handleSave = async() => {
    console.log("Sorted data is ", salaryUtil.sortedSalaryData(salaryStructures))
    console.log("Edited data Structure is ", editableData)
    try {
      await salaryApi.updateSalaryStructure(salaryUtil.sortedSalaryData(salaryStructures)[0].$id, editableData).then((res)=>{
        fetchEmployeeSalaryByEmpId();
      })
    } catch (error) {
      console.log(error);
    }
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    console.log("button clickeed",isEditMode);
 
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardText/>
                <MDBCol>
                  <h1 className="text-center mb-4">Employee Name: {EmployeeDetails.emp_name}</h1>
                  <h3 className="text-center mb-4">Employee Type: </h3>
                </MDBCol>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Basic</th>
                      <th>DA</th>
                      <th>HRA</th>
                      <th>Conveyance</th>
                      <th>Washing Allowance</th>
                      <th>Medical Allowance</th>
                      <th>Other Allowance</th>
                      <th>year</th>
                      <th>month</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  {salaryUtil.sortedSalaryData(salaryStructures).map((salaryStructure, index) => (
                    <tr key={index}>
                      {isEditMode ? (
                        <>
                          <td>
                            <input
                              type="text"
                              value={editableData.basic}
                              onChange={(e) => setEditableData({ ...editableData, basic: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editableData.da}
                              onChange={(e) => setEditableData({ ...editableData, da: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editableData.hra}
                              onChange={(e) => setEditableData({ ...editableData, hra: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editableData.conveyance}
                              onChange={(e) => setEditableData({ ...editableData, conveyance: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editableData.washing_allowance}
                              onChange={(e) => setEditableData({ ...editableData, washing_allowance: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editableData.medical_allowance}
                              onChange={(e) => setEditableData({ ...editableData, medical_allowance: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editableData.other_allowance}
                              onChange={(e) => setEditableData({ ...editableData, other_allowance: e.target.value })}
                            />
                          </td>
                          <td>
                            <MDBBtn onClick={handleSave}>Save</MDBBtn>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{salaryStructure.basic}</td>
                          <td>{salaryStructure.da}</td>
                          <td>{salaryStructure.hra}</td>
                          <td>{salaryStructure.conveyance}</td>
                          <td>{salaryStructure.washing_allowance}</td>
                          <td>{salaryStructure.medical_allowance}</td>
                          <td>{salaryStructure.other_allowance}</td>
                          <td>{salaryStructure.year}</td>
                          <td>{salaryStructure.month}</td>
                          <td>
                            <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  </MDBTableBody>
                 
                </MDBTable>
                <div className="col-md-4 offset-md-4 text-center ">
                  <div className="col-md-4 offset-md-4 mt-4 text-center">
                  { (showAddForm || showMonthYear)? <></>: <MDBBtn onClick={handleAddSalClick} >Add New Salary Structure</MDBBtn>}
                  </div>
                </div>
                {showMonthYear ? (
                  <div className="col-md-4 offset-md-4 mt-4 text-center">
                    <h3>Select Month and Year</h3>
                    <select
                      value={selectedMonth}
                      onChange={(event) => setSelectedMonth(event.target.value)}
                    >
                      {/* Add your month options here */}
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                      {/* Add other months */}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(event) => setSelectedYear(event.target.value)}
                    >
                      {/* Add your year options here */}
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                      {/* Add other years */}
                    </select>
                    <div className="col-md-4 offset-md-4 mt-4 text-center">
                    <MDBBtn onClick={handleAddNewClick}>Next</MDBBtn>
                  </div>
                  </div>
                ) : (
                  <></>
                )}

                {showAddForm ? (
                  <div>
                    
                    <h4 className="text-center mb-4 mt-4">Add New Salary Structure</h4>
                    <h3>{selectedMonth} {selectedYear}</h3>
                    <form className="row g-3" >
                      <div className="col-md-3 mb-3">
                        <label htmlFor="employeeType" className="form-label">
                          Employee Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="employeeType"
                          value={employeeType}
                          onChange={(e) => setEmployeeType(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="basic" className="form-label">
                          Basic
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic"
                          value={basic}
                          onChange={(e) => setBasic(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="da" className="form-label">
                          DA
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="da"
                          value={da}
                          onChange={(e) => setDa(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="hra" className="form-label">
                          HRA
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hra"
                          value={hra}
                          onChange={(e) => setHra(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="convayance" className="form-label">
                          Convayance
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="convayance"
                          value={convayance}
                          onChange={(e) => setConyayance(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="washingAllowance" className="form-label">
                          Washing Allowance
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="washingAllowance"
                          value={washingAllowance}
                          onChange={(e) => setWaDashingAllowance(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="medicalAllowance" className="form-label">
                          Medical Allowance
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="medicalAllowance"
                          value={medicalAllowance}
                          onChange={(e) => setMadicalAllowance(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="otherAllowance" className="form-label">
                          Other Allowance
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="otherAllowance"
                          value={otherAllowance}
                          onChange={(e) => setOtherAllowance(e.target.value)}
                        />
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-4 text-center">
                          <MDBBtn className="col-md-10 mt-4" type='submit' onClick={handleAddSalaryStructure}>
                            Submit
                          </MDBBtn>
                        </div>
                        <div className="col-md-4 text-center me-1" color="danger">
                          <MDBBtn className="col-md-10 mt-4 me-1" color="danger" onClick={handleCancelAddSalaryStructure}>
                            Cancel
                          </MDBBtn>
                        </div>
                      </div>

                    </form>
                  </div>

                ) : (
                  <></>
                )}
             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

}
export default EmployeeSalaryStructure;
