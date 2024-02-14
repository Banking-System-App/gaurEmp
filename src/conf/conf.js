const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteUsersCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),
  appwriteFinalSalaryCollectionId: String(
    import.meta.env.VITE_APPWRITE_FINAL_SALARY_COLLECTION_ID
  ),
  appwriteSalaryStructureCollectionId: String(
    import.meta.env.VITE_APPWRITE_SALARY_STRUCTURE_COLLECTION_ID
  ),
  appwriteCompanysCollectionId: String(
    import.meta.env.VITE_APPWRITE_EMPLOYERS_COLLECTION_ID
  ),
  appwriteEmployeesCollectionId: String(
    import.meta.env.VITE_APPWRITE_EMPLOYEES_COLLECTION_ID
  ),
};

export default conf;
