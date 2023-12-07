//1. createCompany()
//2. getCompany()
//3. getAllCompanies()

import { databases } from "../appWrite/appwrite";


export const databaseApi = {


//     loginWithGoogle: async () => {
//         try {
//             await appwrite.account.createOAuth2Session('google', 'http://localhost:3000/dashboard/', 'http://localhost:3000/');

//         } catch (error) {
//             throw error;
//         }
//     },

//     getCurrentUser: async () => {
//         let promise = appwrite.account.get();

//         return promise.then(function (response) {
//             return response.$id
//         }, function (error) {
//             console.log(error); // Failure
//         });
//     },

    createCompany: async (compName, location, content, userId) => {
        let promise = databases.createDocument('CollectionId', { "compName": compName, "location": location, "experience": content }, [`user:${userId}`], [`user:${userId}`]);

        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    },

    getAllCompanies: async () => {
        let promise = databases.listDocuments('CollectionId');
        return promise.then(function (response) {
            //response.documents is a array
            return response.documents
        }, function (error) {
            console.log(error); // Failure
        });

    }


//     userLogout: async () => {
//         let promise = appwrite.account.deleteSession('current');

//         promise.then(function (response) {
//             console.log(response); // Success
//         }, function (error) {
//             console.log(error); // Failure
//         });

//     },
}