//Method 1

import { Account } from "appwrite";

const account = new Account();

//register
export const authApi = {
    register: async (name, email, password, phone) => {
        try {
            const response = await account.create(email, password, name, phone);
            return response; //Data
        } catch (error) {
            throw error;
        }
    },

//Login
    login: async (email, password) => {
        try {
            const response = await account.createSession(email, password);
            return response; // Data
        } catch (error) {
            throw error;
        }
    },
};





//Method 2
//Using the sdk.account.create method to create the account

// import Appwrite from "appwrite"; //importing from Appwrite's SDK

// import { state } from "./store"; // saving user data to svelte store

// const sdk = new Appwrite();

// sdk

//   .setEndpoint("https://demo.appwrite.io/v1") //set your own endpoint

//   .setProject("607dd16494c6b"); //set your own project id


// export const authApi = {

//     register: async (name, mail, pass, phone) => {

//         try {

//             await sdk.account.create(mail, pass, name, phone);

//             await authApi.login(mail, pass)

//         } catch (error) {

//             throw error;

//         }

//     },

// login: async (mail, pass) => {
//     try {
//         await sdk.account.createSession(mail, pass);
//         const user = await api.getAccount();
//         state.update(n => {
//             n.user = user;
//             return n;
//         });
//     } catch (error) {
//         state.update(n => {
//             n.user = null;
//             return n;
//         });
//         throw error;
//     }
//},

// }
