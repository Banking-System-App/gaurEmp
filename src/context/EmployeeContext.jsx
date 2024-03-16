import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  // Initialize EmployeeDetails from localStorage if available
  const [EmployeeDetails, setEmployeeData] = useState(() => {
    const storedDetails = localStorage.getItem('employeedetail');
    return storedDetails ? JSON.parse(storedDetails) : null;
  });

  const setEmployeeDataValue = (Employee) => {
    // Store updated employee details in localStorage
    localStorage.setItem('employeedetail', JSON.stringify(Employee));
    // Update state
    setEmployeeData(Employee);
    console.log("In context = ", Employee); // Logging the current employee details
  };

  // Use an effect hook to re-initialize the state when the component mounts,
  // in case there are updates to the localStorage directly
  useEffect(() => {
    const storedDetails = localStorage.getItem('employeedetail');
    if (storedDetails) {
      setEmployeeData(JSON.parse(storedDetails));
    }
  }, []);

  return (
    <EmployeeContext.Provider value={{ EmployeeDetails, setEmployeeDataValue }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeData = () => useContext(EmployeeContext);
