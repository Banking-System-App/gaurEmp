


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
            
            designation,
            location,
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
            
        } = obj;

        var newobj = {
            emp_id,
            emp_name,
            gender,
            dob,
            marital_status,
           
            designation,
            location,
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
            
        }

        return newobj;

    },
    changelabel : {
        emp_id: "Employee ID",
        emp_name: "Employee Name",
        gender: "Gender",
        dob: "Date of Birth",
        marital_status: "Marital Status",
        location: "Location",
        designation: "Designation",
        date_of_joining: "Date of Joining",
        professional_tax: "ProfessionalTax",
        intl_w_flag: "intlWFlag",
        pf_flag: "Pf Flag",
        pf_number: "PF Number",
        pen_flag: "Pen Flag",
        d_o_member: "Date of Member",
        es_flag: "ES Flag",
        es_code: "ES Code",
        lwf_flag: "lwfFlag",
        dol: "DateOfLeave",
        reason: "Reason",
        pf_10: "PF10",
        uan_num:"UAN Num",
        aadhar:"Aadhar",
        bank_name:"Bank",
        account_num: "Account Number",
        permanent_address:"Permanent Address",
        father_name: "Father's Name",
         husband_name: "Husband's Name",
        local_address: "Local Address",
        mob_num: "Mobile Number",
        mother_maiden_name: "Mother's Maiden Name",
        pan_num: "PAN Number",
        payment: "Payment Type",
        sos_contact: "SOS Contact",
         

    },


    categorizedLabels : {
  General: {
    location: "Location",
    designation: "Designation",
    date_of_joining: "Date of Joining",
    professional_tax: "ProfessionalTax",
    intl_w_flag: "intlWFlag",
    pf_flag: "Pf Flag",
    pf_number: "PF Number",
    pen_flag: "Pen Flag",
    d_o_member: "Date of Member",
    es_flag: "ES Flag",
    es_code: "ES Code",
    lwf_flag: "lwfFlag",
    dol: "DateOfLeave",
    reason: "Reason",
    pf_10: "PF10",
    uan_num: "UAN Num"
  },
  Bank: {
    aadhar: "Aadhar",
    bank_name: "Bank",
    account_num: "Account Number",
    payment: "Payment Type",
    sos_contact: "SOS Contact"
  },
  PersonalInfo: {
    emp_id: "Employee ID",
    emp_name: "Employee Name",
    gender: "Gender",
    dob: "Date of Birth",
    marital_status: "Marital Status",
    father_name: "Father's Name",
    husband_name: "Husband's Name",
    mother_maiden_name: "Mother's Maiden Name",
    local_address: "Local Address",
    permanent_address: "Permanent Address",
    mob_num: "Mobile Number",
    pan_num: "PAN Number"
  }
}    
}