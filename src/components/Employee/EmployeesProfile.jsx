import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
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
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
              <MDBBtn
                className="ms-auto m-3"
                color="success"
                size="lg"
                onClick={handleSalaryProcess}
              >
                Salary Process Edit
              </MDBBtn>
              <MDBBreadcrumbItem>
                {/* <a href='#'>Home</a> */}
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="2">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "228px" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  Employee Name : {EmployeeDetails.emp_name}
                </p>
                <p className="text-muted mb-4">
                  Address: {EmployeeDetails.location}
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {Object.entries(EmployeeUtil.updatedData(editableData)).map(
                  ([label, value], index) =>
                    index % 4 === 0 && ( // Start a new row for every fourth item
                      <MDBRow key={index}>
                        <MDBCol sm="3">
                          <MDBCardText>
                            {EmployeeUtil.changelabel[label]}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="3">
                          {isEditMode ? (
                            <input
                              type="text"
                              className="form-control"
                              value={value}
                              onChange={(e) =>
                                handleInputChange(label, e.target.value)
                              }
                            />
                          ) : (
                            <MDBCardText className="text-muted">
                              {value}
                            </MDBCardText>
                          )}
                        </MDBCol>
                        {/* Render the next three key-value pairs in the same row */}
                        {Object.entries(EmployeeUtil.updatedData(editableData))
                          .slice(index + 1, index + 4)
                          .map(([innerLabel, innerValue], innerIndex) => (
                            <React.Fragment key={innerIndex}>
                              <MDBCol sm="3">
                                <MDBCardText>
                                  {EmployeeUtil.changelabel[innerLabel]}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="3">
                                {isEditMode ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={innerValue}
                                    onChange={(e) =>
                                      handleInputChange(
                                        innerLabel,
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <MDBCardText className="text-muted">
                                    {innerValue}
                                  </MDBCardText>
                                )}
                              </MDBCol>
                            </React.Fragment>
                          ))}
                      </MDBRow>
                    )
                )}

                {isEditMode && (
                  <>
                    <MDBBtn
                      className="me-8 m-3"
                      color="success"
                      onClick={handleSave}
                    >
                      Save
                    </MDBBtn>
                    <MDBBtn
                      className="me-8 m-3"
                      color="danger"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </MDBBtn>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div className="d-flex justify-content-center mb-3">
          <MDBBtn
            className="me-8 m-3"
            color="success"
            size="lg"
            onClick={handleClick}
          >
            View Salary Structure
          </MDBBtn>
          <MDBBtn
            className="me-8 m-3"
            color="success"
            onClick={handleEditClick}
            size="lg"
          >
            Edit Details
          </MDBBtn>
        </div>
      </MDBContainer>
      <ToastContainer />
    </section>
  );
}
