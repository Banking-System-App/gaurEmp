import React, { createContext, useState } from 'react';

const EmployerContext = createContext();

export const EmployerProvider = ({ children }) => {
  const [EmployerDetails, setEmployerData] = useState(null);

  const setEmployerDataValue = (EmpDetail) => {
    setEmployerData(EmpDetail);
  };

  return (
    <EmployerContext.Provider value={{ EmployerDetails, setEmployerDataValue }}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployerData = () => {
  return React.useContext(EmployerContext);
};
