import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Sidebar from "../components/HeaderFooter/Sidebar";

const PrivateRoutes = () => {
  const { user } = useAuth(); // Replace with your authentication logic

  return user ? (
    <div className="container-fluid" style={{ marginTop: "90px" }}>
      <div className="row">
        <div className="col-md-3 h-100 position-fixed">
          <Sidebar />
        </div>
        <div className="col-md-9 offset-md-3">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
