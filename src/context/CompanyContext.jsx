import React, { createContext, useContext, useState, useEffect } from "react";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  // Initialize CompanyDetails from localStorage if available
  const [CompanyDetails, setCompanyData] = useState(() => {
    const storedDetails = localStorage.getItem('companydetail');
    return storedDetails ? JSON.parse(storedDetails) : null;
  });

  const setCompanyDataValue = (EmpDetail) => {
    // Store updated company details in localStorage
    localStorage.setItem('companydetail', JSON.stringify(EmpDetail));
    // Update state
    setCompanyData(EmpDetail);
    console.log("EmpDetail", EmpDetail); // Logging the current company details
  };

  // Optionally, if you want to re-initialize the state when the component mounts
  // in case there are updates to the localStorage directly,
  // you can use an effect hook like this:
  useEffect(() => {
    const storedDetails = localStorage.getItem('companydetail');
    if (storedDetails) {
      setCompanyData(JSON.parse(storedDetails));
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ CompanyDetails, setCompanyDataValue }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyData = () => useContext(CompanyContext);
