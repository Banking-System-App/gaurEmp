import { sharedUtil } from "./SharedUtil";

export const salaryUtil = {
  //destructuring the object here
  updatedSalaryData(obj) {
    var {
      emp_id,
      emp_name,
      emp_type,
      company_id,
      basic,
      da,
      hra,
      conveyance,
      washing_allowance,
      medical_allowance,
      other_allowance,
      year,
      month,
    } = obj;

    var newobj = {
      emp_id,
      emp_name,
      emp_type,
      company_id,
      basic,
      da,
      hra,
      conveyance,
      washing_allowance,
      medical_allowance,
      other_allowance,
      year,
      month,
    };

    return newobj;
  },

  sortedSalaryData(array) {
    // Sort the array based on the year and month
    array.sort((a, b) => {
      // Compare years first
      if (b.year !== a.year) {
        return b.year - a.year; // Sort by year in descending order
      } else {
        // If years are the same, compare months
        const monthsOrder = {
          January: 1,
          February: 2,
          March: 3,
          April: 4,
          May: 5,
          June: 6,
          July: 7,
          August: 8,
          September: 9,
          October: 10,
          November: 11,
          December: 12,
        };
        return monthsOrder[b.month] - monthsOrder[a.month]; // Sort by month in ascending order
      }
    });

    // Return the sorted array
    return array.slice(0, 1);
  },

  earning(obj) {
    var {
      emp_id,
      company_id,
      basic,
      da,
      hra,
      conveyance,
      washing_allowance,
      medical_allowance,
      other_allowance,
    } = obj;

    var newobj = {
      emp_id,
      company_id,
      basic,
      da,
      hra,
      conveyance,
      washing_allowance,
      medical_allowance,
      other_allowance,
    };

    return newobj;
  },

  calculateDA(rate, days) {
    return ((rate * days) / 30).toFixed(2);
  },

  calculatePF() {},

  calculateBasic(rate, days) {
    return ((rate * days) / 30).toFixed(2);
  },

  calculateHRA(rate, days) {
    return ((rate * days) / 30).toFixed(2);
  },

  calculateGrossEarnings(earnings) {
    var sum = 0;

    for (const property in earnings) sum += earnings[property];
    return sum;
  },

  calculateGrossDeductions() {},

  calculateNetPayable() {},

  prepareFinalSalaryObjectEmployee(employee) {
    const finalSal = {
      employee_name: employee.emp_name,
      employee_type: "0",
      company_id: employee.company_id,
      earned_leave: (employee.leaves).toString(),
      wp: "0",
      days_paid: (employee.totalDays).toString(),
      overtime_hours: "0",
      basic: this.calculateBasic(employee.basic, employee.totalDays),
      da: this.calculateDA(employee.da, 30),
      hra: (employee.hra).toString(),
      conveyance: "0",
      washing_allowance: "0",
      madical_allowance: "0",
      other_allowance: "0",
      incentive: "0",
      monthly_rate: "0",
      overtime_pay: "0",
      daily_rate: "0",
      reimbursement: "0",
      gross_earning: this.calculateGrossEarnings([30, 30, 30]).toString(),
      total_earning: "0",
      pf_contribution: "0",
      vol_pf: "0",
      esi_contribution: "0",
      professional_tax: "0",
      labour_wf: "0",
      income_tax: "0",
      loan_recovered: "0",
      advanced_recovered: "0",
      other_deductions: "0",
      gross: "0",
      net_payable: "0",
      year: sharedUtil.getCurrentYear(),
      month: sharedUtil.getCurrentMonth(),
      employee_number: employee.emp_id,
    };

    return finalSal;
  },
};

//The object we are getting from API: SalaryStructure
/* 
const SalaryStructure  = {
  basic: 1800,
  company_id: "987",
  conveyance: 3,
  da: 8,
  emp_id: "12",
  emp_name: "Adbhishek",
  emp_type: null,
  hra: 6,
  medical_allowance: 367,
  month: "January",
  other_allowance: 13,
  washing_allowance: 128,
  year: "2024",
};
 */

//The Object we have to render

/* 
const originalObject = {
  basic: 1800,
  company_id: "987",
  conveyance: 3,
  da: 8,
  emp_id: "12",
  emp_name: "Adbhishek",
  emp_type: null,
  hra: 6,
  medical_allowance: 367,
  month: "January",
  other_allowance: 13,
  washing_allowance: 128,
  year: "2024",
  totalDays: 21, 
  leaves: 5, 
  selected: false
};
 */

//The object we have to send to the API : FinalSalary
/* 
{
  "employee_name": "0",
  "employee_type": "0",
  "earned_leave": "0",
  "wp": "0",
  "days_paid": "0",
  "overtime_hours": "0",
  "basic": "0",
  "da": "0",
  "hra": "0",
  "conveyance": "0",
  "washing_allowance": "0",
  "madical_allowance": "0",
  "other_allowance": "0",
  "incentive": "0",
  "monthly_rate": "0",
  "overtime_pay": "0",
  "daily_rate": "0",
  "reimburshment": "0",
  "gross_earning": "0",
  "total_earning": "0",
  "pf_contribution": "0",
  "vol_pf": "0",
  "esi_contribution": "0",
  "professional_tax": "0",
  "labour_wf": "0",
  "income_tax": "0",
  "loan_recovered": "0",
  "advanced_recovered": "0",
  "other_deductions": "0",
  "gross": "0",
  "net_payable": "0",
  "year": "0",
  "month": "0",
  "employee_number": "0",
  "company_id": "0"
}
*/
