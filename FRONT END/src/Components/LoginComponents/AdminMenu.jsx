// AdminMenu.jsx
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ProfileMenu from "../LoginComponents/ProfileMenu";
import "./adminTheme.css";


const AdminMenu = () => {
  return (
    <div className="container admin-page">
      {/* TOP NAV */}
      <div className="top-nav">
        <div className="top-nav-inner">
          <h1 className="logo">
            Lost <span className="accent">Found</span>
          </h1>

          <Navbar expand="lg" className="site-navbar">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center site-nav">
                <NavDropdown title="Students" id="student-dropdown">
                  <NavDropdown.Item href="/StudentList">
                    Student List
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Items" id="items-dropdown">
                  <NavDropdown.Item href="/found-report">
                    Found Item List
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/lost-report">
                    Lost Item List
                  </NavDropdown.Item>
                  <NavDropdown.Item href="">
                    Match Item List
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/chat-msg">Chat</Nav.Link>

                {/* PROFILE ICON */}
                <ProfileMenu />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <h2>
          Lost and Found
          <span className="accent"> Admin Menu</span>
        </h2>
        <p className="lead">
          Your trusted platform to reconnect people with their belongings.
        </p>
      </section>
    </div>
  );
};

export default AdminMenu;
