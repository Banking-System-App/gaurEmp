import React, { createContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [EmployeeDetails, setEmployeeData] = useState();

  const setEmployeeDataValue = (Employee) => {
    console.log("In context = ", Employee);
    setEmployeeData(Employee);
  };

  return (
    <EmployeeContext.Provider value={ {EmployeeDetails, setEmployeeDataValue} }>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeData = () => {
  return React.useContext(EmployeeContext);
};
