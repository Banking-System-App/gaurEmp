import { databaseApi } from '../database/databaseApi';

export const userApi = {
  // Function to add a user
  addUser: async (name, email, uniqueID) => {
    try {
      const resp = await databaseApi.createUser(name, email, uniqueID);
      console.log("User Added Successfully Testing: ", resp);
      alert("user Added successfully");
      return resp; // Return the response if needed
    } catch (error) {
      console.log(error.message);
      throw error; // Propagate the error for better error handling in calling code
    }
  },
};