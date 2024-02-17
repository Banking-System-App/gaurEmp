import { differenceInMonths, formatISO } from 'date-fns';

export const sharedUtil = {

  monthNames :[
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

years :[
  "2023",
  "2022",
  "2021",
],

  isPrivateRoute(path) {
    const publicRoutes = ["/Signup", "/about", "/contact", "/Login"];
    return !publicRoutes.includes(path);
  },

};
