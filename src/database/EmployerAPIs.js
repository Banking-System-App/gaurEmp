import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";
import conf from "../conf/conf";

const employerCollectionId = conf.appwriteEmployersCollectionId
const databaseID = conf.appwriteDatabaseId;

export class EmployerAPIs {
  constructor() {}

  async createEmployer(
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
    tanNum,
    agentId
  ) {
    console.log("Appwrite service :: createEmployer()");
    try {
      return await databases.createDocument(databaseID, employerCollectionId, "", {
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
        tan_no: tanNum,
        agent_id: agentId,
      });
    } catch (error) {
      console.error("Appwrite service :: createEmployer() :: ", error); // Failure
      return false
    }
  }

  async getEmployerDetail(employerId) {
    console.log("Appwrite service :: getEmployerDetail()");
    try {
      return await databases.listDocuments(databaseID, employerCollectionId, [Query.equal("employer_id", employerId)]);
    } catch (error) {
      console.error("Appwrite service :: getEmployerDetail() :: ", error);
      return false
    }
  }

  async getAllEmployerByUserId(agentId) {
    console.log("Appwrite service :: getAllEmployerByUserId()");
    try {
      return await databases.listDocuments(databaseID, employerCollectionId, [Query.equal("agent_id", agentId)]);
    } catch (error) {
      console.error("Appwrite service :: getAllEmployerByUserId() :: ", error);
      return false
    }
  }

  async updateEmployerData(documentId, updatedData) {
    console.log("Appwrite service :: updateEmployerData()");
    try {
      return await databases.updateDocument(databaseID, employerCollectionId, documentId, updatedData);
    } catch (error) {
      console.error("Appwrite service :: updateEmployerData() :: ", error);
      return false
    }
  }
}

const employerApis = new EmployerAPIs();
export default employerApis;
