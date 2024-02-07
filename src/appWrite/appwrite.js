import { Client, Account,Databases} from 'appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('656b67273d425a12f953');

export const account = new Account(client);
export const databases = new Databases(client);

