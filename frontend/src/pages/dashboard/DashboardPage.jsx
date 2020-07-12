import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import GalleryPage from "../gallery/GalleryPage";
import MapsPage from "../maps/MapsPage";
import MessagesPage from "../message/MessagesPage";
import ProfilePage from "../profile/ProfilePage";

export default function DashboardPage(props) {
  document.title = "Dashboard";

  const path = props.match.path;
  const history = useHistory();

  const [mobileMode, setMobileMode] = useState(false);

  const resize = () => {
    setMobileMode(window.innerWidth <= 760);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
  });

  return (
    <>
      <Row className="mt-1 ml-0 mr-0 pl-0 pr-0">
        <Col lg={2} sm={2} xl={2} md={3} className="pl-0 pr-0">
          {!mobileMode && (
            <SidebarComponent history={history} mobileMode={mobileMode} />
          )}
        </Col>
        <Col lg={10} sm={10} xl={10} md={10}>
          <Route path={`${path}/gallery/:tabName`} component={GalleryPage} />
          <Route path={`${path}/message`} component={MessagesPage} />
          <Route path={`${path}/maps`} component={MapsPage} />
          <Route path={`${path}/profile`} component={ProfilePage} />
        </Col>
      </Row>
    </>
  );
}
