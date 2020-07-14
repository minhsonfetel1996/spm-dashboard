import React from "react";
import { Navbar } from "react-bootstrap";
import MainMenusComponent from "./MainMenusComponent";
import "./sidebar.styles.scss";

export default class SidebarComponent extends React.Component {
  render() {
    return (
      <Navbar expand="lg" className="flex-column p-0">
        <MainMenusComponent
          history={this.props.history}
          mobileMode={this.props.mobileMode}
        />
      </Navbar>
    );
  }
}
