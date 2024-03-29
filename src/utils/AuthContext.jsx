import { createContext, useContext, useEffect, useState } from "react";
import { account, ID } from "../appWrite/appwrite";
import { userApi } from "../pages/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  //ye sala loop bna rha tha

  useEffect(() => {
    console.log("use Effect loop");
    checkUserStatus();
  });

  //Logic to login user
  const loginUser = async (userInfo) => {
    console.log("login loop check");
    setLoading(true);
    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  //logout part
  const logoutUser = () => {
    console.log("logout loop");
    account.deleteSession("current");
    setUser(null);
  };

  //logic to register user
  const registerUser = async (userInfo) => {
    console.log("register loop");

    setLoading(true);

    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
      setUser(accountDetails);

      await userApi.addUser(userInfo.name, userInfo.email, accountDetails.$id);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  //logic to check the status of the user
  const checkUserStatus = async () => {
    console.log("chek user status loop");
    if (user == false) {
      try {
        let accountDetails = await account.get();
        setUser(accountDetails);
      } catch (error) {
        console.log("chek user status Error");
      }
    }
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
