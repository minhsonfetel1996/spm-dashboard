import React from "react";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./header.styles.scss";
import { getCurrentUser } from "../../reducers/CurrentUserReducer";
import { connect } from "react-redux";

function HeaderComponent({ user }) {
  const renderCurrentUsername = (user) => {
    return (
      <NavDropdown
        className="ml-0"
        title={user.displayName}
        id="current-user-dropdown"
      >
        <NavLink id="profile-nav-link" className="nav-link" to="/profile">
          <NavItem>
            <i className="fa fas fa-user"></i>
            <span>Profile</span>
          </NavItem>
        </NavLink>
        <NavDropdown.Divider />
        <NavLink id="logout-nav-link" className="nav-link" to="/logout">
          <NavItem>
            <i className="fa fas fa-sign-out"></i>
            <span>Log out</span>
          </NavItem>
        </NavLink>
      </NavDropdown>
    );
  };

  const renderNavbarItems = () => {
    return (
      <>
        <NavLink id="dashboard-nav-link" className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
      </>
    );
  };

  return (
    <Navbar expand="sm" bg="dark" variant="dark" className="dark-mode">
      <Navbar.Brand>
        <NavLink className="navbar-brand" to="/">
          <h3>Study place</h3>
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse">
        <Nav className="mr-auto">{renderNavbarItems()}</Nav>
        <Nav>
          {!!user && !!user.id ? (
            renderCurrentUsername(user)
          ) : (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: getCurrentUser(state),
  };
};

export default connect(mapStateToProps)(HeaderComponent);
