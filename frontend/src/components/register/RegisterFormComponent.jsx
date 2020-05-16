import React from "react";
import FormComponent from "../core/form/FormComponent";
import Joi from "joi-browser";
import Input from "../core/input/InputComponent";
import "./register-form.styles.css";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  showToastSuccess,
  showToastError,
} from "../../reducers/GlobalToastReducer";
import { connect } from "react-redux";
import { register } from "../../services/auth.service";

class RegisterFormComponent extends FormComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      errors: {},
      globalError: null,
    };
  }

  getSchema() {
    return {
      username: Joi.string().required().min(8).max(50).label("Username"),
      password: Joi.string().min(8).max(120).required().label("Password"),
      firstName: Joi.string().required().label("First name"),
      lastName: Joi.string().required().label("Last name"),
    };
  }

  processSubmitSuccessful(response) {
    this.props.showToastSuccess("Alert", response.message);
    window.location.reload();
  }

  processSubmitUnsuccessful(response) {
    if (response && response.status === 400) {
      this.setState({ globalError: response.message });
    } else {
      this.props.showToastError("Error", response.message);
    }
  }

  async submit() {
    const response = await register({ ...this.state.data });
    if (response.status === 200) {
      this.processSubmitSuccessful(response);
    } else {
      this.processSubmitUnsuccessful(response);
    }
  }

  render() {
    const { data, errors, globalError } = this.state;
    return (
      <div className="register-form-container container-fluid">
        <div className="register-form-title col-12">Register</div>
        <form className="register-form">
          {globalError && <Alert variant="danger">{globalError}</Alert>}
          <Input
            id="input-username"
            label="Username"
            type="text"
            name="username"
            value={data.username}
            error={errors.username}
            focus={true}
            onChange={this.handleChange}
            placeholder="Please enter your email"
          ></Input>
          <Input
            id="input-password"
            label="Password"
            type="password"
            name="password"
            value={data.password}
            error={errors.password}
            onChange={this.handleChange}
            placeholder="Please enter your password"
          ></Input>
          <Input
            id="input-first-name"
            label="First name"
            type="text"
            name="firstName"
            value={data.firstName}
            error={errors.firstName}
            onChange={this.handleChange}
            placeholder="Please enter your first name"
          ></Input>
          <Input
            id="input-last-name"
            label="Last name"
            type="text"
            name="lastName"
            value={data.lastName}
            error={errors.lastName}
            onChange={this.handleChange}
            placeholder="Please enter your last name"
          ></Input>
          <div className="pull-right mr-1">
            <small>
              Have an account?
              <Link to="/login">
                <span> Log in now </span>
              </Link>
            </small>
          </div>
          <Button type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { ...props };
};

const mapDispatchToProps = (dispatch) => ({
  showToastSuccess: (title, message) =>
    dispatch(showToastSuccess(title, message)),
  showToastError: (message) => dispatch(showToastError(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormComponent);
