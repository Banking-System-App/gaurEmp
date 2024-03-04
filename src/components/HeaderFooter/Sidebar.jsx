import { Nav } from "react-bootstrap";
import React, { useState } from "react";
import "./Sidebar.css"; // Import your custom CSS file for styling

import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import BasicModal from "../Modals/BasicModal";

const Sidebar = () => {
  const { logoutUser } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <main className="d-flex flex-nowrap">
      <div className="flex-shrink-0 p-3 bg-white" style={{ width: 280 }}>
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
        >
          <span className="fs-5 fw-semibold">Hello</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button
              className="btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#company-collapse"
              aria-expanded="true"
            >
              Companies
            </button>
            <div className="collapse show" id="company-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/getcompany"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Add Company
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className=" btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              Employees
            </button>
            <div className="collapse" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="#"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Add Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Edit Employee
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className=" btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse"
              aria-expanded="false"
            >
              Salary
            </button>
            <div className="collapse" id="orders-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="#"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Get Salary
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/bulksalaryprocess"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Salary of All Emp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/salaryprocess"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Generate Slip
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className=" btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse"
              aria-expanded="false"
            >
              Account
            </button>
            <div className="collapse" id="account-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="#"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleShowLogoutModal}
                    className="link-dark d-inline-flex text-decoration-none rounded"
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div className="b-example-divider b-example-vr"></div>

      <BasicModal
        show={showLogoutModal}
        handleClose={handleCloseLogoutModal}
        modalHeading="Confirm Logout"
        modalBody="Are you sure you want to logout?"
        modalPrimary="Logout"
        primaryFn={logoutUser} // Pass logoutUser function as primary function
      />
    </main>
  );
};

export default Sidebar;
