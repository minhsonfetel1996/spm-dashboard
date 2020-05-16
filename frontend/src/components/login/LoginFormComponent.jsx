import Joi from "joi-browser";
import React from "react";
import { Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  showToastError,
  showToastSuccess,
} from "../../reducers/GlobalToastReducer";
import { login } from "../../services/auth.service";
import FormComponent from "../core/form/FormComponent";
import Input from "../core/input/InputComponent";
import "./login-form.styles.css";

class LoginFormComponent extends FormComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
      },
      errors: {},
      globalError: null,
    };
  }

  getSchema() {
    return {
      username: Joi.string().required().max(50).label("Username"),
      password: Joi.string().min(8).max(120).label("Password"),
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
    const response = await login({...this.state.data});
    if (response.status === 200) {
      this.processSubmitSuccessful(response);
    } else {
      this.processSubmitUnsuccessful(response);
    }
  }

  render() {
    const { data, errors, globalError } = this.state;
    return (
      <div className="login-form-container container-fluid">
        <div className="login-form-title">Login</div>
        <form className="login-form">
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
            placeholder="Please enter your username"
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
          <div className="pull-right mr-1">
            <small>
              Don't have an account?
              <Link to="/register">
                <span> Register </span>
              </Link>
            </small>
          </div>
          <Button
            type="submit"
            className="outline-secondary"
            onClick={this.handleSubmit}
          >
            Login
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
