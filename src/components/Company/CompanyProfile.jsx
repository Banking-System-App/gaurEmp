
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyUtil } from "../../utils/CompanyUtil";
import { useCompanyData } from "../../context/CompanyContext";
import companyApis from "../../database/CompanyAPIs";
import { toast } from "react-toastify";

export default function CompanyProfile() {
  const { CompanyDetails } = useCompanyData();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addemployee");
  };

  const handleViewEmployees = () => {
    navigate("/viewemployees");
  };

  //call api call and set into intial data
  const [isEditMode, setIsEditMode] = useState(false);
  const [company, setCompany] = useState([]);
  const [editableData, setEditableData] = useState({ ...company[0] });

  useEffect(() => {
    companyApis.getCompanyDetail(CompanyDetails.company_id).then((response) => {
      console.log("CompanyProfile:: Company ", response);

      if (response === false) {
        toast.error("Loading Failed !", {
          theme: "light",
          autoClose: 1000,
        });
      } else {
        setCompany(response.documents[0]);
        setEditableData(response.documents[0]);
      }
    });
  }, []);

  const handleInputChange = (label, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Data:", editableData);
    console.log("Emp loyer id : ", company.$id);

    companyApis
      .updateCompanyData(
        editableData.$id,
        CompanyUtil.updatedData(editableData)
      )
      .then((response) => {
        //In case of error: False is returned from API method
        if (response === false) {
          toast.error("Something went wrong !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          toast.success("Updated Successfully!", {
            theme: "light",
            autoClose: 1000,
          });
        }

        setIsEditMode(false);
      });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    console.log("button clickeed", isEditMode);
  };
  const handleCancelEdit = () => {
    setEditableData({ ...company });
    setIsEditMode(false);
  };

  const handlePaySlips = () => {
    navigate("/generateslippdf");
  };

  return (
    <section>
    <Container className="py-5">
      <h1 className="mb-4">Company Details</h1>
      <Row >
        {Object.entries(CompanyUtil.updatedData(editableData)).map(([label, value], index) => (
          <Col key={index} lg="4">
            <Row className="mb-2 ">
              <Col sm="6">
                <strong>{CompanyUtil.changelabel[label]}</strong>
              </Col>
              <Col sm="6">
                {isEditMode ? (
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                  />
                ) : (
                  <p className="text-muted">{value}</p>
                )}
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      {isEditMode && (
        <Row>
          <Col>
            <Button className="me-8 m-3" variant="success" onClick={handleSave}>
              Save
            </Button>
            <Button className="me-8 m-3" variant="danger" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Col>
        </Row>
      )}
      <div className="d-flex justify-content-center mb-3">
        <Button className="me-8 m-3" variant="success" size="lg" onClick={handleViewEmployees}>
          View Employees
        </Button>
        <Button className="me-8 m-3" variant="success" size="lg" onClick={handleClick}>
          Add Employee
        </Button>
        <Button className="me-8 m-3" variant="success" onClick={handleEditClick} size="lg">
          Edit Details
        </Button>
        <Button className="me-8 m-3" variant="success" onClick={handlePaySlips} size="lg">
          Generate Pay Slips
        </Button>
      </div>
    </Container>
  </section>
  );
}
