export const sharedUtil = {

    isPrivateRoute(path){
  
  const publicRoutes = ["/Signup", "/about", "/contact", "/Login"];
  return !publicRoutes.includes(path);
}
}