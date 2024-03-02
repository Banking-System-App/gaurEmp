import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";

const databaseID = "656c2c4e3621c2f65000";
const collectionIdSalaryStructure = "658b0eee2802c5d7a42c";
const collectionIdProcessSalary = "659ee3c01f10512c7e17";

export const salaryApi = {
  //function to create salary structure

  createSalaryStrcture: async (
    empId,
    empName,
    empType,
    companyId,
    basic,
    da,
    hra,
    conveyance,
    washingAllowance,
    medicalAllowance,
    otherAllowance,
    year,
    month
  ) => {
    console.log("Collection ID:", collectionIdSalaryStructure);
    try {
      const promise = databases.createDocument(
        databaseID,
        collectionIdSalaryStructure,
        "",
        {
          emp_id: empId,
          emp_name: empName,
          emp_type: empType,
          company_id: companyId,
          basic: basic,
          da: da,
          hra: hra,
          conveyance: conveyance,
          washing_allowance: washingAllowance,
          medical_allowance: medicalAllowance,
          other_allowance: otherAllowance,
          year: year,
          month: month,
        }
      );

      const response = await promise;
      console.log(response); // Success
    } catch (error) {
      console.error(error); // Failure
    }
  },

  //function to add and the process the salary.
  processSalary: async (
    employeeName,
    employeeType,
    companyId,
    earnedLeave,
    wo,
    daysPaid,
    overtimeHours,
    basic,
    da,
    hra,
    conveyance,
    washingAllowance,
    medicalAllowance,
    otherAllowance,
    incentive,
    monthlyRate,
    overtimePay,
    dailyRate,
    reimbursement,
    grossEarning,
    totalEarning,
    pfContribution,
    volPf,
    esiContribution,
    professionalTax,
    labourWf,
    incomeTax,
    loanRecovered,
    advancedRecovered,
    otherDeductions,
    gross,
    netPayable,
    year,
    month,
    employeeNumber,
    userId
  ) => {
    console.log("Collection ID:", collectionIdProcessSalary);
    try {
      const promise = databases.createDocument(
        databaseID,
        collectionIdProcessSalary,
        "",
        {
          employee_name: employeeName,
          employee_type: employeeType,
          company_id: companyId,
          earned_leave: earnedLeave,
          wp: wo,
          days_paid: daysPaid,
          overtime_hours: overtimeHours,
          basic: basic,
          da: da,
          hra: hra,
          conveyance: conveyance,
          washing_allowance: washingAllowance,
          madical_allowance: medicalAllowance,
          other_allowance: otherAllowance,
          incentive: incentive,
          monthly_rate: monthlyRate,
          overtime_pay: overtimePay,
          daily_rate: dailyRate,
          reimbursement: reimbursement,
          gross_earning: grossEarning,
          total_earning: totalEarning,
          pf_contribution: pfContribution,
          vol_pf: volPf,
          esi_contribution: esiContribution,
          professional_tax: professionalTax,
          labour_wf: labourWf,
          income_tax: incomeTax,
          loan_recovered: loanRecovered,
          advanced_recovered: advancedRecovered,
          other_deductions: otherDeductions,
          gross: gross,
          net_payable: netPayable,
          year: year,
          month: month,
          employee_number: employeeNumber,
        }
      );

      const response = await promise;
      console.log(response); // Success
    } catch (error) {
      console.error(error); // Failure
    }
  },

  getSalaryStructure: async (empId, month, year) => {
    console.log("getSalaryStructure API called");
    try {
      const promise = databases.listDocuments(
        databaseID,
        collectionIdSalaryStructure,
        [Query.equal("emp_id", empId), Query.equal("month", month)]
        // Query.equal("year", year)]
      );
      const response = await promise;
      return response.documents;
    } catch (error) {
      console.log(error); // Failure
    }
  },

  getSalaryStructuresByEmpId: async (empId) => {
    console.log("getSalaryStructuresByEmpId API called", empId);
    try {
      const promise = databases.listDocuments(
        databaseID,
        collectionIdSalaryStructure,
        [Query.equal("emp_id", empId)]
        // Query.equal("year", year)]
      );
      const response = await promise;
      return response.documents;
    } catch (error) {
      console.log(error); // Failure
    }
  },

  //get the salary structure by emp_id

  getSalaryByEmpId: async (companyId, empId) => {
    console.log("Backend compName = ", empId);
    try {
      const promise = databases.listDocuments(
        databaseID,
        collectionIdProcessSalary,
        [
          Query.equal("emp_id, ", empId) &
            Query.equal("company_id, ", companyId),
        ]
      );
      const response = await promise;
      if (response.error) {
        console.error(response.error);
        throw new Error("Failed to fetch employees.");
      }
      return response.documents;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch employees.");
    }
  },

  updateSalaryStructure: async (documentID, updatedData) => {
    try {
      await databases.updateDocument(
        databaseID,
        collectionIdSalaryStructure,
        documentID,
        updatedData
      );
    } catch (error) {
      console.error(error);
    }
  },

};
