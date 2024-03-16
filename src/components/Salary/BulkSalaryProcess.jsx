import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";
import { useNavigate } from "react-router-dom";
import { useEmployeeData } from "../../context/EmployeeContext";
import salaryApis from "../../database/SalaryAPIs";
import { toast } from "react-toastify";
import { useCompanyData } from "../../context/CompanyContext";
import { salaryUtil } from "../../utils/SalaryUtil";
import { sharedUtil } from "../../utils/SharedUtil";
import { pdfUtil } from "../../utils/PdfUtil";
import employeeApis from "../../database/EmployeeAPIs";

const BulkSalaryProcess = () => {
  const { setEmployeeDataValue } = useEmployeeData();
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const { CompanyDetails } = useCompanyData();

  //HashTable for fast search
  const [existingEmpIdsInFinalSalryTable,setExistingEmpIdsInFinalSalryTable] = useState({}) 
  // {'66': docID,'99': docID2,'101': docID6,'102': docID4} values as key, and documentID as values
  

  // State to manage employee data
  const [employees, setEmployees] = useState([
    /* { id: 1, name: 'John Doe', designation: 'Software Engineer', totalDays: 20, leaves: 2, selected: false }
 */
  ]);

  const [existingFinalSalaries,setExistingFinalSalaries] = useState([{}]) 


  useEffect(() => {
    /* TODO: 1. Call salry Structure
    2. make set that in employees  
    3. One emp can have multiple slary staurue for that we have to choose latest*/

    salaryApis
      .getAllEmpSalaryStructuresByCompID(CompanyDetails.company_id)
      .then((response) => {
        console.log(
          "BulkSalaryProcess :: getAllEmpSalaryStructuresByCompID: response",
          response
        );
        if (response === false) {
          toast.error("Fetching Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          const originalObjects = response.documents;
          const modifiedObjects = originalObjects.map((originalObject) => {
            return {
              ...originalObject,
              totalDays: 0,
              leaves: 0,
              selected: false,
            };
          });
          setEmployees(modifiedObjects);
        }
      });

      getExistingFinalSalaries();
      
  }, []);

  // Function to toggle selection for all employees
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedEmployees = employees.map((employee) => ({
      ...employee,
      selected: !selectAll,
    }));
    setEmployees(updatedEmployees);
  };

  // Event handler for toggling selection
  const handleSelectionChange = (employeeId) => {
    const index = employees.findIndex((employee) => employee.emp_id === employeeId);
    console.log("handleSelectionChange::index",index);

    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        selected: !updatedEmployees[index].selected,
      };
      setEmployees(updatedEmployees);
    }
  };

  // Event handler for editing working days
  const handleWorkingDaysChange = (employeeId, value) => {
    const index = employees.findIndex((employee) => employee.emp_id === employeeId);
    console.log("handleWorkingDaysChange::index",index);
    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        totalDays: parseInt(value, 10),
      };
      setEmployees(updatedEmployees);
    }
  };

  // Event handler for editing leaves
  const handleLeavesChange = (employeeId, value) => {
    const index = employees.findIndex((employee) => employee.emp_id === employeeId);
    if (index !== -1) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        leaves: parseInt(value, 10),
      };
      setEmployees(updatedEmployees);
    }
  };


  const getExistingFinalSalaries=()=>{
     //call final salry API. 
     salaryApis.getFinalSalariesByCompIdMonthYear(CompanyDetails.company_id,sharedUtil.getCurrentMonth(),sharedUtil.getCurrentYear())
     .then((response)=>{
       console.log(
         "BulkSalaryProcess :: getFinalSalariesByCompIdMonthYear: response",
         response
       );

       if (response !== false && response.documents.length!==0) {

        setExistingFinalSalaries(response.documents)
         response.documents.forEach((finalSalary)=>{
           //if the emplyeeID is not in our HashTable then insert a pair of empID:docID

           if(!existingEmpIdsInFinalSalryTable[finalSalary.employee_number] ){
             setExistingEmpIdsInFinalSalryTable(prevState => ({
               ...prevState,
               [finalSalary.employee_number]: finalSalary.$id
           }));
           }
         })
       } 

     })
  }

  const createDocinBulk = async () => {
    let documents = employees;

    let promises = [];

    console.time("insertdocuments");

    //run loop for selected employees only
    for (let i = 0; i < documents.length && documents[i].selected; i++) {
      //calculate the final salary object
      let finalSalary = salaryUtil.prepareFinalSalaryObjectEmployee(
        documents[i]
      );

      /* if finalSalry of any employee already exist then update that
      other wise insert */
      let createdDocument;
      
      if(existingEmpIdsInFinalSalryTable[documents[i].emp_id]){
        createdDocument = salaryApis.updateFinalSalary(existingEmpIdsInFinalSalryTable[documents[i].emp_id],finalSalary);
      }else{
        createdDocument = salaryApis.processSalary(finalSalary);
      }
      // let createdDocument = salaryApis.processSalary(finalSalary);
      promises.push(createdDocument);

      if (i % 1000 == 0)
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    Promise.all(promises).then((res) => {
        console.timeEnd("insertdocuments");
        console.log("promises::",res);

        if(res[0]===false){

        toast.error("Opps, Failed!", {
          theme: "light",
          autoClose: 1000,
        });
      }else{
        toast.success("Holla done !", {
          theme: "light",
          autoClose: 1000,
        });

        //get The updates list of finalSalaries
        getExistingFinalSalaries()
      }

      }).catch((e) => {
        toast.error(" Failed !", {
          theme: "light",
          autoClose: 1000,
        });
      });
  };

  const handleEmployeeRowClick = (event, employeeId) => {
    // handling the double click only
    if (event.detail === 2) {
      /* 1. Set the emp context
        2. Navigating to /salaryprocess
        3. check on that file , we shlud be using the emp context to populate CompanyDetails */

      console.log("double click");
      console.log("BulkSalaryProcess::comapny ID, employeeID",CompanyDetails.company_id,employeeId);
      employeeApis
      .getEmployeeDetail( CompanyDetails.company_id,employeeId)
      .then((response) => {
        console.log("BulkSalaryProcess:: getEmployeeDetail ", response);
        if (response === false || response.documents.length===0) {
          toast.error("Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          setEmployeeDataValue(response.documents[0]);
          navigate("/salaryprocess");
        }
      });
    }
  };

  // Event handler for submitting data
  const handleSubmit = (e) => {
  e.preventDefault()

    // const selectedEmployees = employees.filter((employee) => employee.selected);
    // console.log(selectedEmployees);

    /* TODO: Final salry object should be here. */
    createDocinBulk();
    
  };

  const handleGenearteSlips = (e)=>{
    e.preventDefault()
    pdfUtil.generatePDF1(existingFinalSalaries)

  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            {/* <th>Employee Type</th> */}
            <th>Employee Type</th>
            <th>Total Working Days</th>
            <th>Leaves</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee,index) => (
            <tr key={index}
            onClick={(e) =>
                    handleEmployeeRowClick(e,employee.emp_id)}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={employee.selected}
                  onChange={() => handleSelectionChange(employee.emp_id)}
                />
              </td>
              <td>{employee.emp_name}</td>
              <td>{employee.emp_id}</td>
              <td>{employee.emp_type}</td>
              <td>
                <Form.Control
                  type="number"
                  value={employee.totalDays}
                  onChange={(e) =>
                    handleWorkingDaysChange(employee.emp_id, e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={employee.leaves}
                  onChange={(e) =>
                    handleLeavesChange(employee.emp_id, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleGenearteSlips}>generate slip</Button>
    </div>
  );
};

export default BulkSalaryProcess;
