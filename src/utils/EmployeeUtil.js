


export const EmployeeUtil = {


    updatedData(obj){


        // var obj1 = {a:1, b:2, c:3};
        // var {b, c} = obj;//pick property b and c
        // var newObj = {b, c}; //shortcut for {b:b, c:c} in ES-6
        // console.log(newObj);

        var {
            emp_id,
            emp_name,
            gender,
            dob,
            marital_status,
            location,
            designation,
            date_of_joining,
            professional_tax,
            intl_w_flag,
            pf_flag,
            pf_number,
            pen_flag,
            d_o_member,
            es_flag,
            es_code,
            lwf_flag,
            dol,
            reason,
            pf_10,
            uan_num,
            aadhar,
            pan_num,
            mob_num,
            payment,
            bank_name,
            account_num,
            father_name,
            husband_name,
            mother_maiden_name,
            local_address,
            sos_contact,
            permanent_address,
            comp_name,
            comp_id
        } = obj;

        var newobj = {
            emp_id,
            emp_name,
            gender,
            dob,
            marital_status,
            location,
            designation,
            date_of_joining,
            professional_tax,
            intl_w_flag,
            pf_flag,
            pf_number,
            pen_flag,
            d_o_member,
            es_flag,
            es_code,
            lwf_flag,
            dol,
            reason,
            pf_10,
            uan_num,
            aadhar,
            pan_num,
            mob_num,
            payment,
            bank_name,
            account_num,
            father_name,
            husband_name,
            mother_maiden_name,
            local_address,
            sos_contact,
            permanent_address,
            comp_name,
            comp_id
        }

        return newobj;

    },
    changelabel : {
        emp_id: "empId",
        emp_name: "empName",
        gender: "gender",
        dob: "dob",
        marital_status: "maritalStatus",
        location: "location",
        designation: "designation",
        date_of_joining: "dateOfJoining",
        professional_tax: "professionalTax",
        intl_w_flag: "intlWFlag",
        pf_flag: "pfFlag",
        pf_number: "pfNum",
        pen_flag: "penFlag",
        d_o_member: "dateOfMember",
        es_flag: "esFlag",
        es_code: "esCode",
        lwf_flag: "lwfFlag",
        dol: "dateOfLeave",
        reason: "reason",
        pf_10: "pf10",
    }
}