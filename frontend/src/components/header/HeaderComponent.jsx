import React from "react";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getCurrentUser,
  removeUserProfile,
} from "../../reducers/CurrentUserReducer";
import { logout } from "../../services/auth.service";
import "./header.styles.scss";
import {
  showToastSuccess,
  showToastError,
} from "../../reducers/GlobalToastReducer";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMode: false,
    };
  }

  setMobileMode = (value) => {
    this.setState({ mobileMode: value });
  };

  resize = () => {
    this.setMobileMode(window.innerWidth < 991);
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  async handleLogout() {
    const result = await logout();
    if (result.status === 200) {
      this.props.showToastSuccess("Alert", result.message);
      this.props.removeUser();
      setTimeout(() => {
        window.location.assign("/login");
      }, 200);
    } else {
      this.props.showToastError("Logout unsuccessfully");
    }
  }

  renderCurrentUsername = (user) => {
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
        <NavLink className="nav-link" to="">
          <NavItem id="logout-nav-item" onClick={this.handleLogout.bind(this)}>
            <i className="fa fas fa-sign-out"></i>
            <span>Log out</span>
          </NavItem>
        </NavLink>
      </NavDropdown>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <Navbar expand="sm" bg="dark" variant="dark" className="dark-mode">
        <Navbar.Brand>
          <NavLink className="navbar-brand" to="/">
            <h3>Study place</h3>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ml-auto">
            {!!user && !!user.id ? (
              this.renderCurrentUsername(user)
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
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: getCurrentUser(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(removeUserProfile()),
  showToastSuccess: (title, message) =>
    dispatch(showToastSuccess(title, message)),
  showToastError: (message) => dispatch(showToastError(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
