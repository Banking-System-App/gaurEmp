import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";

const employerCollectionId = "6570aa637f3e31a920ea";
const databaseID = "656c2c4e3621c2f65000";


export const employeeApi = {

  createEmployer: async (
    employerId,
    employerName,
    employerAddress,
    pfMemberFlag,
    pfCode,
    group,
    pfLimit,
    esMemberFlag,
    esiCode,
    locationOffice,
    lwfFlag,
    lwfCode,
    otPayableFlag,
    otRate,
    panNum,
    tanNum
  ) => {
    console.log("Collection ID:", employerCollectionId);
    try {
      const promise = databases.createDocument(
        databaseID,
        employerCollectionId,
        "",
        {
            employer_id: employerId,
            employer_address: employerAddress,
            pf_code: pfCode,
            pf_limit: pfLimit,
            esi_code: esiCode,
            name: employerName,
            lwf_flag: lwfFlag,
            pf_member: pfMemberFlag,
            ot_payable_flag: otPayableFlag,
            group: group,
            pan_numer: panNum,
            es_member_flag: esMemberFlag,
            location_office: locationOffice,
            lwf_code: lwfCode,
            ot_rate: otRate,
            tan_no: tanNum
        }
      );

      const response = await promise;
      console.log(response); // Success
    } catch (error) {
      console.error(error); // Failure
    }
  },


getEmployerDetail: async (companyId,empId) => {
    console.log("companyId: empid",companyId,empId);
    try {
      const promise = databases.listDocuments(
        databaseID,
        employerCollectionId,
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

  getAllEmployerByUserId: async (compId) => {
    try {
      const promise = databases.listDocuments(
        databaseID,
        employerCollectionId,
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
