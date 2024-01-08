import { Client, Account,Databases, Query} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('656b67273d425a12f953'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);

export { ID } from 'appwrite';
