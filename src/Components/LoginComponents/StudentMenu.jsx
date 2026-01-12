import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../LoginComponents/ProfileMenu";
import "./StudentMenu.css";


const StudentMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="student-page">
      {/* top bar */}
      <header className="student-topbar">
        <div className="student-brand">
          <span>Lost</span> <span>Found</span>
        </div>

        <Navbar expand="lg" className="student-navbar">
          <Navbar.Toggle aria-controls="student-navbar-nav" />
          <Navbar.Collapse id="student-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <NavDropdown title="Student" id="student-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Items" id="items-nav-dropdown">
                <NavDropdown.Item href="/lost-entry">
                  Report Lost Item
                </NavDropdown.Item>
                <NavDropdown.Item href="/lost-report">
                  Lost Item List
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/found-entry">
                  Report Found Item
                </NavDropdown.Item>
                <NavDropdown.Item href="/found-report">
                  Found Item List
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/chat-msg">
                <b>Chatting</b>
              </Nav.Link>

              {/* PROFILE ICON (Chrome-style) */}
              <ProfileMenu />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>

      {/* hero content */}
      <main className="student-hero">
        <h1 className="hero-title-main">Lost and Found</h1>
        <h2 className="hero-title-sub">Student Menu</h2>
        <p className="hero-subtext">
          Your trusted platform to reconnect people with their belongings.
        </p>

        <div className="hero-actions">
          <button
            className="hero-btn-primary"
            onClick={() => navigate("/lost-entry")}
          >
            Report Lost Item
          </button>
          <button
            className="hero-btn-outline"
            onClick={() => navigate("/found-entry")}
          >
            Report Found Item
          </button>
        </div>

        {/* feature cards */}
        <section className="feature-row">
          <article className="feature-card">
            <div className="feature-icon search">🔍</div>
            <h3 className="feature-title">Quick Search</h3>
            <p className="feature-text">
              Easily browse lost &amp; found items with filters.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon report">📍</div>
            <h3 className="feature-title">Report Easily</h3>
            <p className="feature-text">
              Submit details in seconds with a simple form.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon support">🤝</div>
            <h3 className="feature-title">Community Support</h3>
            <p className="feature-text">
              Helping people return items honestly &amp; safely.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default StudentMenu;
