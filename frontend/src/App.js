import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./components/header/HeaderComponent";
import LogoutComponent from "./components/logout/LogoutComponent";
import ModalComponent from "./components/modal/ModalComponent";
import ToastComponent from "./components/toast/ToastComponent";
import AuthPage from "./pages/auth/AuthPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getCurrentUser } from "./reducers/CurrentUserReducer";

class App extends React.Component {
  buildAuthRoute = (path, isLoggedIn, isLoginForm) => {
    return (
      <Route
        path={path}
        render={(props) =>
          !isLoggedIn ? (
            <AuthPage {...props} isLoginForm={isLoginForm} />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
    );
  };

  render() {
    const { user } = this.props;
    const isLoggedIn = !!user && !!user.id;
    return (
      <BrowserRouter>
        <HeaderComponent />
        <ToastComponent />
        <ModalComponent />
        <Switch>
          {this.buildAuthRoute("/login", isLoggedIn, true)}
          {this.buildAuthRoute("/register", isLoggedIn, false)}
          <Route path="/logout" component={LogoutComponent}></Route>
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/not-found" component={NotFoundPage}></Route>
          <Redirect from="/" exact to="/dashboard" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: getCurrentUser(state),
  };
};

export default connect(mapStateToProps)(App);
