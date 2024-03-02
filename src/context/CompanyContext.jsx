import React, { createContext, useState } from "react";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [CompanyDetails, setCompanyData] = useState(null);

  const setCompanyDataValue = (EmpDetail) => {
    setCompanyData(EmpDetail);
  };

  return (
    <CompanyContext.Provider value={{ CompanyDetails, setCompanyDataValue }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyData = () => {
  return React.useContext(CompanyContext);
};
