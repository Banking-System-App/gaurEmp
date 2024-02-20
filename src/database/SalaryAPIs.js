import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";
import conf from "../conf/conf";

const databaseID = conf.appwriteDatabaseId;
const collectionIdSalaryStructure = conf.appwriteSalaryStructureCollectionId;
const collectionIdProcessSalary = conf.appwriteFinalSalaryCollectionId;

export class SalaryAPIs {
  constructor() {}

  async createSalaryStructure(
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
  ) {
    console.log("Appwrite service :: createSalaryStructure()");
    try {
      return await databases.createDocument(
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
    } catch (error) {
      console.error("Appwrite service :: createSalaryStructure() :: ", error);
      return false;
    }
  }

  async processSalary(
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
  ) {
    console.log("Appwrite service :: processSalary()");
    try {
      return await databases.createDocument(
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
    } catch (error) {
      console.error("Appwrite service :: processSalary() :: ", error);
      return false;
    }
  }

  async getSalaryStructure(empId, month, year) {
    console.log("Appwrite service :: getSalaryStructure()");
    try {
      return await databases.listDocuments(
        databaseID,
        collectionIdSalaryStructure,
        [
          Query.equal("emp_id", empId),
          Query.equal("month", month),
          Query.equal("year", year),
        ]
      );
    } catch (error) {
      console.error("Appwrite service :: getSalaryStructure() :: ", error);
      return false;
    }
  }

  async getSalaryStructuresByEmpId(empId) {
    console.log("Appwrite service :: getSalaryStructuresByEmpId()");
    try {
      return await databases.listDocuments(
        databaseID,
        collectionIdSalaryStructure,
        [Query.equal("emp_id", empId)]
      );
    } catch (error) {
      console.error(
        "Appwrite service :: getSalaryStructuresByEmpId() :: ",
        error
      );
      return false;
    }
  }

  async getSalaryByEmpId(companyId, empId) {
    console.log("Appwrite service :: getSalaryByEmpId()");
    try {
      return await databases.listDocuments(
        databaseID,
        collectionIdProcessSalary,
        [Query.equal("emp_id", empId), Query.equal("company_id", companyId)]
      );
    } catch (error) {
      console.error("Appwrite service :: getSalaryByEmpId() :: ", error);
      return false;
    }
  }

  async updateSalaryStructure(documentID, updatedData) {
    console.log("Appwrite service :: updateSalaryStructure()");
    try {
      await databases.updateDocument(
        databaseID,
        collectionIdSalaryStructure,
        documentID,
        updatedData
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: updateSalaryStructure() :: ", error);
      return false;
    }
  }
}

const salaryApis = new SalaryAPIs();
export default salaryApis;
