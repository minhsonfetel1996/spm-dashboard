import React from "react";
import { connect } from "react-redux";
import { removeUserProfile } from "../../reducers/CurrentUserReducer";
import { showToastError, showToastSuccess } from "../../reducers/GlobalToastReducer";
import { logout } from "../../services/auth.service";

class LogoutComponent extends React.Component {

  UNSAFE_componentWillMount() {
    this.handleLogout();
  }

  handleLogout = async () => {
    const result = await logout();
    debugger;
    if (result.status === 200) {
      this.props.showToastSuccess("Alert", result.message);
    } else {
      this.props.showToastError("Logout unsuccessfully");
    }
    this.props.removeUser();
    this.props.history.push("/login");
    window.location.reload();
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return { ...props };
};

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(removeUserProfile()),
  showToastSuccess: (title, message) =>
    dispatch(showToastSuccess(title, message)),
  showToastError: (message) => dispatch(showToastError(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);
