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
import { EmployerUtil } from "../../utils/EmployerUtil";
import { useEmployerData } from "../../context/EmployerContext";
import employerApis from "../../database/EmployerAPIs";
import { toast } from "react-toastify";

export default function EmployerProfile() {
  const { EmployerDetails } = useEmployerData();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addemployee");
  };

  const handleViewEmployees = () => {
    navigate("/viewemployees");
  };

  //call api call and set into intial data
  const [isEditMode, setIsEditMode] = useState(false);
  const [employer, setEmployer] = useState([]);
  const [editableData, setEditableData] = useState({ ...employer[0] });

  useEffect(() => {
    employerApis
      .getEmployerDetail(EmployerDetails.employer_id)
      .then((response) => {
        console.log("EmployerProfile:: Employer ", response);

        if (response === false) {
          toast.error("Loading Failed !", {
            theme: "light",
            autoClose: 1000,
          });
        } else {
          setEmployer(response.documents[0]);
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
    console.log("Emp loyer id : ", employer.$id);

    employerApis
      .updateEmployerData(
        editableData.$id,
        EmployerUtil.updatedData(editableData)
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
    setEditableData({ ...employer });
    setIsEditMode(false);
  };

  const handlePaySlips = () => {
    navigate("/generateslippdf");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-2 mb-4">
              <MDBBtn className="ms-auto m-3" color="success" size="lg">
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
            <MDBCard className="mb-3">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "228px" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  Comapny Name: {editableData.name}
                </p>
                <p className="text-muted mb-4">
                  Address: {editableData.employer_address}{" "}
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <h1>Company Details</h1>
            <MDBCard className="mb-4">
              <MDBCardBody>
                {Object.entries(EmployerUtil.updatedData(editableData)).map(
                  ([label, value], index) =>
                    index % 4 === 0 && ( // Start a new row for every fourth item
                      <MDBRow key={index}>
                        <MDBCol sm="3">
                          <MDBCardText>
                            {EmployerUtil.changelabel[label]}
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
                        {Object.entries(EmployerUtil.updatedData(editableData))
                          .slice(index + 1, index + 4)
                          .map(([innerLabel, innerValue], innerIndex) => (
                            <React.Fragment key={innerIndex}>
                              <MDBCol sm="3">
                                <MDBCardText>
                                  {EmployerUtil.changelabel[innerLabel]}
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
            onClick={handleViewEmployees}
          >
            View Employees
          </MDBBtn>
          <MDBBtn
            className="me-8 m-3"
            color="success"
            size="lg"
            onClick={handleClick}
          >
            Add Employee
          </MDBBtn>
          <MDBBtn
            className="me-8 m-3"
            color="success"
            onClick={handleEditClick}
            size="lg"
          >
            Edit Details
          </MDBBtn>
          <MDBBtn
            className="me-8 m-3"
            color="success"
            onClick={handlePaySlips}
            size="lg"
          >
            Generate Pay Slips
          </MDBBtn>
        </div>
      </MDBContainer>
    </section>
  );
}
