import React from "react";
import { Nav } from "react-bootstrap";
import MenuComponent from "./menu/MenuComponent";
import { createBrowserHistory } from "history";

export default class MainMenusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

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
    const { mobileMode } = this.props;
    return (
      <Nav
        variant={mobileMode ? "" : "pills"}
        className={mobileMode ? "" : "flex-lg-column sidebar-nav w-100 ml-3"}
      >
        {[galleryMenus, messages, mapsMenus, profileMenus].map((value, key) => {
          return (
            <MenuComponent menu={value} key={key} history={this.history} />
          );
        })}
      </Nav>
    );
  }
}
