import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";

const employeesCollectionId = "6570acd4d7b822e5c1b1";
const databaseID = "656c2c4e3621c2f65000";


export const employeeApi = {

  createEmployee: async (
    empId,
    empName,
    gender,
    dob,
    maritalStatus,
    location,
    designation,
    dateOfJoining,
    professionalTax,
    intlWFlag,
    pfFlag,
    pfNum,
    penFlag,
    dateOfMember,
    esFlag,
    esCode,
    lwfFlag,
    dateOfLeave,
    reason,
    pf10,
    uanNum,
    aadharNum,
    panNum,
    mobileNum,
    payment,
    bankName,
    accountNum,
    fatherName,
    husbandName,
    motherMaidenName,
    localAddress,
    sosContact,
    permanentAddress,
    compName,
    compId
  ) => {
    console.log("Collection ID:", employeesCollectionId);
    try {
      const promise = databases.createDocument(
        databaseID,
        employeesCollectionId,
        "",
        {
            emp_id: empId,
            emp_name: empName,
            gender: gender,
            dob: dob,
            marital_status: maritalStatus,
            location: location,
            designation: designation,
            date_of_joining: dateOfJoining,
            professional_tax: professionalTax,
            intl_w_flag: intlWFlag,
            pf_flag: pfFlag,
            pf_number: pfNum,
            pen_flag: penFlag,
            d_o_member: dateOfMember,
            es_flag: esFlag,
            es_code: esCode,
            lwf_flag: lwfFlag,
            dol: dateOfLeave,
            reason: reason,
            pf_10: pf10,
            uan_num: uanNum,
            aadhar: aadharNum,
            pan_num: panNum,
            mob_num: mobileNum,
            payment: payment,
            bank_name: bankName,
            account_num: accountNum,
            father_name: fatherName,
            husband_name: husbandName,
            mother_maiden_name: motherMaidenName,
            local_address: localAddress,
            sos_contact: sosContact,
            permanent_address: permanentAddress,
            comp_name: compName,
            comp_id:compId
        }
      );

      const response = await promise;
      console.log(response); // Success
    } catch (error) {
      console.error(error); // Failure
    }
  },


getEmployeeDetail: async (companyId,empId) => {
    console.log("companyId: empid",companyId,empId);
    try {
      const promise = databases.listDocuments(
        databaseID,
        employeesCollectionId,
        [ Query.equal("comp_id", companyId),
          Query.equal("emp_id", empId)]
      );
      const response = await promise;
      if (response.error) {
        console.error(response.error);
        throw new Error("Failed to fetch employees.");
      }
      return response.documents;
    } catch (error) {
      console.error(error);
      // Handle the error as needed (e.g., show a message to the user)
      throw new Error("Failed to fetch employees.");
    }
  },

  getAllEmployeesByCompanyId: async (compId) => {
    try {
      const promise = databases.listDocuments(
        databaseID,
        employeesCollectionId,
        [Query.equal("comp_id", compId)]
      );
      const response = await promise;
      if (response.error) {
        console.error(response.error);
        throw new Error("Failed to fetch employees.");
      }
      return response.documents;
    } catch (error) {
      console.error(error);
      // Handle the error as needed (e.g., show a message to the user)
      throw new Error("Failed to fetch employees.");
    }
  },

};
