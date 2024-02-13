import { databases } from "../appWrite/appwrite";
import { Query } from "appwrite";
import conf from "../conf/conf";

const companyCollectionId = conf.appwriteCompanysCollectionId;
const databaseID = conf.appwriteDatabaseId;

export class CompanyAPIs {
  constructor() {}

  async createCompany(
    companyId,
    companyName,
    companyAddress,
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
    console.log("Appwrite service :: createCompany()");
    try {
      return await databases.createDocument(
        databaseID,
        companyCollectionId,
        "",
        {
          company_id: companyId,
          company_address: companyAddress,
          pf_code: pfCode,
          pf_limit: pfLimit,
          esi_code: esiCode,
          name: companyName,
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
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createCompany() :: ", error); // Failure
      return false;
    }
  }

  async getCompanyDetail(companyId) {
    console.log("Appwrite service :: getCompanyDetail()");
    try {
      return await databases.listDocuments(databaseID, companyCollectionId, [
        Query.equal("company_id", companyId),
      ]);
    } catch (error) {
      console.error("Appwrite service :: getCompanyDetail() :: ", error);
      return false;
    }
  }

  async getAllCompanyByUserId(agentId) {
    console.log("Appwrite service :: getAllCompanyByUserId()");
    try {
      return await databases.listDocuments(databaseID, companyCollectionId, [
        Query.equal("agent_id", agentId),
      ]);
    } catch (error) {
      console.error("Appwrite service :: getAllCompanyByUserId() :: ", error);
      return false;
    }
  }

  async updateCompanyData(documentId, updatedData) {
    console.log("Appwrite service :: updateCompanyData()");
    try {
      return await databases.updateDocument(
        databaseID,
        companyCollectionId,
        documentId,
        updatedData
      );
    } catch (error) {
      console.error("Appwrite service :: updateCompanyData() :: ", error);
      return false;
    }
  }
}

const companyApis = new CompanyAPIs();
export default companyApis;
