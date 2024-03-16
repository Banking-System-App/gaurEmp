// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { account, ID } from '../appWrite/appwrite';
import { userApi } from '../pages/userApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
      setUser(accountDetails);
      localStorage.setItem('user', JSON.stringify(accountDetails));
      console.log("login user context accountDetails",accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
    localStorage.removeItem('user');
    //TODO: remove companydetail , employee detail;
    localStorage.removeItem('companydetail');
    localStorage.removeItem('employeedetail');

  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.name);
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
      setUser(accountDetails);
      localStorage.setItem('user', JSON.stringify(accountDetails));
      await userApi.addUser(userInfo.name, userInfo.email, accountDetails.$id);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const checkUserStatus = async () => {
    if (!user) {
      try {
        let accountDetails = await account.get();
        setUser(accountDetails);
        localStorage.setItem('user', JSON.stringify(accountDetails));
      } catch (error) {
        console.log("check user status Error");
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  };

  const contextValue = {
    user,
    loading,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
