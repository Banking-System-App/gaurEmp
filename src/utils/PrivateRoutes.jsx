import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "./AuthContext";
import Sidebar from "../components/HeaderFooter/Sidebar";

const PrivateRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Define the endpoints where you want to hide the sidebar
  const hideSidebarEndpoints = ["/getcompany", "/"];

  // Check if the current location matches any of the endpoints to hide the sidebar
  const shouldShowSidebar = !hideSidebarEndpoints.includes(location.pathname);

  return user ? (
    <Container fluid style={{ marginTop: '90px' }}>
      <Row>
        {shouldShowSidebar && (
          <Col md={3} className="position-fixed">
            <Sidebar />
          </Col>
        )}
        <Col md={shouldShowSidebar ? 9 : 12} className={shouldShowSidebar ? "offset-md-3" : ""}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
