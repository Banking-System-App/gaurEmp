
import { Container, Row, Col, Button } from 'react-bootstrap';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeUtil } from "../../utils/EmployeeUtil";
import { useEmployeeData } from "../../context/EmployeeContext";
import employeeApis from "../../database/EmployeeAPIs";
import { ToastContainer, toast } from "react-toastify";

export default function EmployeeProfile() {
  const { EmployeeDetails } = useEmployeeData();
  console.log("Employee Detail is : ", EmployeeDetails);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/salarystructure");
  };

  const handleSalaryProcess = () => {
    navigate("/salaryprocess");
    alert("salaryprocess button clicked");
  };

  const [employee, setEmployee] = useState([]);

  const [editableData, setEditableData] = useState({ ...employee[0] });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    employeeApis
      .getEmployeeDetail(EmployeeDetails.comp_id, EmployeeDetails.emp_id)
      .then((response) => {
        console.log("EmployeeProfile:: Employee ", response);

        if (response === false) {
          toast.error("Loading Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          setEmployee(response.documents);
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
    employeeApis
      .updateEmployeeData(
        editableData.$id,
        EmployeeUtil.updatedData(editableData)
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
          //only when edit is successfuly saved
          setIsEditMode(false);
        }
      });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    console.log("button clickeed", isEditMode);
  };
  const handleCancelEdit = () => {
    setEditableData({ ...employee[0] });
    setIsEditMode(false);
  };

  return (
    <section>
      <Container className="py-5">
        <h1 className="mb-4">Employee Details</h1>
        <Row>
          {Object.entries(EmployeeUtil.updatedData(editableData)).map(([label, value], index) => (
            <Col key={index} sm="12" md="6" lg="4">
              <Row className="mb-2">
                <Col sm="6">
                  <strong>{EmployeeUtil.changelabel[label]}</strong>
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
          <Button className="me-8 m-3" variant="success" size="lg" onClick={""}>
            View Salary Structure
          </Button>
          <Button className="me-8 m-3" variant="success" size="lg" onClick={handleClick}>
            Add Employee
          </Button>
        </div>
      </Container>
    </section>
  );
}
