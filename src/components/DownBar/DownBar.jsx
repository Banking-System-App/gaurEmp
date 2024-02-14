import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './DownBar.css'
import { Navigate, useNavigate } from "react-router-dom";


function DownBar() {

    const navigate = useNavigate();

  const addCompany = () => {
    navigate("/addcompany");
  };


  return (
    <Container fluid className="sticky-bottom">
      <Row className=" p-2 bg-light border rounded">
        <Col>
        <Button onClick={addCompany} variant="primary">Add Company</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DownBar