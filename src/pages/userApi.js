import { databases } from "../appWrite/appwrite";

export const userApi = {
  // Function to add a user
  addUser: async (userName, userEmail, uniqueUserID) => {
    
    try {
      const promise = databases.createDocument(
        "656c2c4e3621c2f65000",
        "65a193a19e9dbfdcb77e",
        "",
        {
          user_name: userName,
          email: userEmail,
          mobile_number: '9936',
          unique_id: uniqueUserID,
        }
      );

      const response = await promise;
      console.log("User bhaiya", response); // Success
      return response;
    } catch (error) {
      console.error(error); // Failure
    }
  },
};