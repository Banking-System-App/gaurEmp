import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";
import conf from "../conf/conf";

const employeesCollectionId = conf.appwriteEmployeesCollectionId
const databaseID = conf.appwriteDatabaseId


export class EmployeeAPIs{

  constructor(){

  }

  async createEmployee(
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
  ){
    console.log("Appwrite service :: createEmployee() ");
    try {
      return await databases.createDocument(
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
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser() :: ", error);
      return false
  }
  }

  async getEmployeeDetail (companyId,empId) {
    console.log("Appwrite service :: getEmployeeDetail() ");
    try {
      return await databases.listDocuments(
        databaseID,
        employeesCollectionId,
        [ Query.equal("comp_id", companyId),
          Query.equal("emp_id", empId)]
      );
      
    } catch (error) {
      console.log("Appwrite service :: getEmployeeDetail() :: ", error);
      return false
    }
  }

  async getAllEmployeesByCompanyId (compId) {
    console.log("Appwrite service :: getAllEmployeesByCompanyId() ");
    try {
      return await databases.listDocuments(
        databaseID,
        employeesCollectionId,
        [Query.equal("comp_id", compId)]
      );
     
    } catch (error) {
      console.log("Appwrite service :: getAllEmployeesByCompanyId() :: ", error);
      return false
    }
  }

  async updateEmployeeData (documentId,updatedData){
    console.log("Appwrite service :: updateEmployeeData() ");
    try{
      await databases.updateDocument(
        databaseID,
        employeesCollectionId,
        documentId,
        updatedData
      );
    }
    catch(error){
      console.log("Appwrite service :: updateEmployeeData() :: ", error);
      return false
    }
  }

  async deleteEmployeeData(documentId,employeesCollectionId){
    console.log("Appwrite service :: deleteEmployeeData()");
    try{
      await databases.deleteDocument(
        documentId,
        employeesCollectionId,
        documentId
      );

    }
  
  catch(error){
    console.log("Appwrite service ::deleteEmployeeData :: ", error);
  }

}
}


const employeeApis = new EmployeeAPIs();
export default employeeApis
