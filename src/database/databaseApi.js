import { databases} from "../appWrite/appwrite";
import { Query } from "appwrite";
const collectionId = "6570aa637f3e31a920ea";
const collectionId1 = "6570acd4d7b822e5c1b1";

export const databaseApi = {
  createCompany: async (compName, location, experience, email, address, pfMember, otPayable, panNumber, userId) => {
    console.log('Collection ID:', collectionId);
    try {
      const promise = databases.createDocument(
        "656c2c4e3621c2f65000",
        collectionId,
        '',
        {
          "compName": compName,
          "location": location,
          "experience": experience,
          "email": email,
          "address": address,
          "pfMember": pfMember,
          "otPayable": otPayable,
          "panNumber": panNumber
        },
      );

      const response = await promise;
      console.log(response); // Success
    } catch (error) {
      console.error(error); // Failure
    }
  },

  createEmployee: async (empName, gender, email, mobile, dob, address, doj, panNumber, aadhar, compName, userId) => {
    console.log('Collection ID:', collectionId);
    try {
      const promise = databases.createDocument(
        "656c2c4e3621c2f65000",
        collectionId1,
        '',
        {
          "empName": empName,
          "gender": gender,
          "email": email,
          "mobile": mobile,
          "dob": dob,
          "address": address,
          "doj": doj,
          "panNumber": panNumber,
          "aadhar": aadhar,
          "compName": compName
        },
      );

      const response = await promise;
      console.log(response); // Success
    } catch (error) {
      console.error(error); // Failure
    }
  },

  getAllCompanies: async () => {
    try {
      const promise = databases.listDocuments('656c2c4e3621c2f65000', collectionId);
      const response = await promise;
      return response.documents;
    } catch (error) {
      console.log(error); // Failure
    }
  },

  getAllEmployees: async () => {
    try {
      const promise = databases.listDocuments('656c2c4e3621c2f65000', collectionId1);
      const response = await promise;
      return response.documents;
    } catch (error) {
      console.log(error); // Failure
    }
  },

  getCompaniesByUserId: async (userId) => {
    try {
        
    } catch (error) {
      console.log(error); // Failure
    }
  },
  

  getEmployeesByCompanyName: async (compName) => {
    console.log("Backend compName = ",compName)
    try {

      const promise = databases.listDocuments('656c2c4e3621c2f65000', collectionId1, [Query.equal('compName', compName)]);
      const response = await promise;
      if (response.error) {
        console.error(response.error);
        throw new Error('Failed to fetch employees.');
      }
      return response.documents;
    } catch (error) {
      console.error(error);
      // Handle the error as needed (e.g., show a message to the user)
      throw new Error('Failed to fetch employees.');
    }
  }
};

