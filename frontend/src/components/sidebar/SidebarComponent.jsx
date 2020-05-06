import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import MenuComponent from "./menu/MenuComponent";
import "./sidebar.styles.scss";

export default class SidebarComponent extends React.Component {
  initGallerySubMenu = (parentUrl) => {
    return [
      {
        id: "nature",
        title: "Nature",
        url: parentUrl + "/nature",
        icon: "fa fas fa-leaf",
      },
      {
        id: "food-and-drink",
        title: "Food & drink",
        url: parentUrl + "/food-drink",
        icon: "fa fas fa-coffee",
      },
      {
        id: "films",
        title: "Films",
        url: parentUrl + "/films",
        icon: "fa fas fa-film",
      },
    ];
  };

  initGalleryMenu() {
    return {
      title: "Gallery",
      icon: "fa fas fa-image",
      url: null,
      submenus: this.initGallerySubMenu("/dashboard/gallery"),
    };
  }

  initMessageMenu = () => {
    return {
      id: "messages",
      title: "Messages",
      url: "/dashboard/message/list",
      icon: "fa fas fa-id-card",
    };
  };

  initMapsMenu() {
    return {
      title: "Maps",
      icon: "fa fas fa-globe",
      url: "/dashboard/maps",
    };
  }

  initProfileMenus() {
    return {
      title: "Profile",
      icon: "fa fas fa-user",
      url: "/dashboard/profile",
    };
  }

  initMenu() {
    return {
      galleryMenus: this.initGalleryMenu(),
      messages: this.initMessageMenu(),
      mapsMenus: this.initMapsMenu(),
      profileMenus: this.initProfileMenus(),
    };
  }

  render() {
    const { galleryMenus, messages, mapsMenus, profileMenus } = this.initMenu();
    const history = this.props.history;
    return (
      <Navbar expand="lg" className="flex-column p-0">
        <Navbar.Toggle aria-controls="sidebar" />
        <Navbar.Collapse id="sidebar" className="w-100">
          <Nav
            variant="pills"
            className="flex-lg-column sidebar-nav w-100 ml-3"
          >
            <MenuComponent menu={galleryMenus} history={history} />
            <MenuComponent menu={messages} history={history} />
            <MenuComponent menu={mapsMenus} history={history} />
            <MenuComponent menu={profileMenus} history={history} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
