import React from "react";
import { Nav } from "react-bootstrap";
import MenuComponent from "./menu/MenuComponent";
import { createBrowserHistory } from "history";

export default class MainMenusComponent extends React.Component {
  history = createBrowserHistory();

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
      subMenus: this.initGallerySubMenu("/dashboard/gallery"),
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

  initMenu() {
    return [this.initGalleryMenu(), this.initMessageMenu()];
  }

  render() {
    const { mobileMode } = this.props;

    return (
      <Nav
        variant={mobileMode ? "" : "pills"}
        className={mobileMode ? "" : "flex-lg-column sidebar-nav w-100 ml-3"}
      >
        {this.initMenu().map((value, key) => {
          return (
            <MenuComponent menu={value} key={key} history={this.history} />
          );
        })}
      </Nav>
    );
  }
}
