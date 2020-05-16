import React from "react";
import { Col, Row } from "react-bootstrap";
import LoginFormComponent from "../../components/login/LoginFormComponent";
import RegisterFormComponent from "../../components/register/RegisterFormComponent";
import "./auth-page.styles.css";

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Login - Register";
  }

  render() {
    const { isLoginForm } = this.props;
    return (
      <div className="d-flex justify-content-center auth-page-container">
        <Row>
          <Col col={12}>
            {isLoginForm ? (
              <div className="login-form-content">
                <LoginFormComponent />
              </div>
            ) : (
              <div className="register-form-content">
                <RegisterFormComponent />
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
