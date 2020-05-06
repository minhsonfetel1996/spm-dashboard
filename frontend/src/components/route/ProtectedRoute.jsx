import React from "react";

export default function (ComposedComponent, isAuthorized) {
  class ProtectedRoute extends React.Component {
    constructor(props) {
      super(props);
      if (!isAuthorized) {
        this.props.history.push("/login");
      }
    }
    render = () => <ComposedComponent {...this.props} />;
  }
  return ProtectedRoute;
}
