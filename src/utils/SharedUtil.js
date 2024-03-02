import { differenceInMonths, formatISO } from "date-fns";

export const sharedUtil = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  years: ["2023", "2022", "2021"],

  isPrivateRoute(path) {
    const publicRoutes = ["/Signup", "/about", "/contact", "/Login"];
    return !publicRoutes.includes(path);
  },

  getCurrentMonth() {
    // Create a new Date object
    const currentDate = new Date();

    // Get the month (0-indexed, so January is 0)
    const currentMonthIndex = currentDate.getMonth();

    // Get the month name using the index
    const currentMonthName = this.monthNames[currentMonthIndex];

    return currentMonthName;
  },

  getCurrentYear() {
    const currentDate = new Date();
    // Get the full year (4-digit)
    const currentYear = currentDate.getFullYear();
    return currentYear.toString();
  },
  
};
