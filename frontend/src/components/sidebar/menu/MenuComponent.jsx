import React from "react";
import { NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class MenuComponent extends React.PureComponent {
  historyEventListener;

  constructor(props) {
    super(props);
    this.state = {
      openSubMenu: this.checkSubMenuOpeningHandler(
        this.props.history.location.pathname
      ),
    };
  }

  checkSubMenuOpeningHandler(pathname) {
    return (
      !!this.props.menu.subMenus &&
      this.props.menu.subMenus.filter((v) => v.url === pathname).length > 0
    );
  }

  componentDidMount() {
    this.historyEventListener = this.props.history.listen((location) => {
      this.setState({
        openSubMenu: this.checkSubMenuOpeningHandler(location.pathname),
      });
    });
  }

  componentWillUnmount() {
    if (this.historyEventListener) {
      this.historyEventListener();
    }
  }

  renderSubMenu(subMenu) {
    return (
      <NavLink
        key={`${subMenu.id}-nav-link`}
        className="nav-link"
        to={subMenu.url}
      >
        <NavItem>
          <i className={subMenu.icon}></i> {subMenu.title}
        </NavItem>
      </NavLink>
    );
  }

  getDefaultUrl = (menu) => {
    return menu.url ? menu.url : menu.subMenus ? menu.subMenus[0].url : null;
  };

  render() {
    const { menu } = this.props;

    return (
      <>
        <NavLink
          className="nav-link"
          to={this.getDefaultUrl(menu)}
          onClick={() => {
            this.setState({ openSubMenu: true });
          }}
        >
          <NavItem>
            <i className={menu.icon}></i> {menu.title}
          </NavItem>
        </NavLink>
        <div className="ml-3">
          {this.state.openSubMenu &&
            menu.subMenus &&
            <>{menu.subMenus.map((sm) => this.renderSubMenu(sm))}</>}
        </div>
      </>
    );
  }
}
