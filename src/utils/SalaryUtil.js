export const salaryUtil = {


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
            month
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
            month
        }

        return newobj;
    },
}