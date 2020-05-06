import React from "react";

export default function (ComposedComponent, isAuth) {
  class ProtectedRoute extends React.Component {
    componentDidMount() {
      if (!isAuth) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return ProtectedRoute;
}
