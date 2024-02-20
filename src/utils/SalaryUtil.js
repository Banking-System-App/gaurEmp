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

  calculateDA(rate,days) {
    return ((rate*days)/30).toFixed(2)
  },

  calculatePF() {},

  calculateBasic(rate,days) {
    return ((rate*days)/30).toFixed(2)
  },

  calculateHRA(rate,days) {
    return ((rate*days)/30).toFixed(2)
  },

  calculateGrossEarnings(earnings) {
    var sum=0;
    
    for (const property in earnings) 
      sum+=earnings[property]
    return sum
  },

  calculateGrossDeductions() {},

  calculateNetPayable() {},
};
