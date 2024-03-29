import { Client, Account,Databases} from 'appwrite';
import conf from '../conf/conf';

export const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
