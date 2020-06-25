import React from "react";
import { NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class MenuComponent extends React.PureComponent {
  historyEventListener;

  constructor(props) {
    super(props);
    this.state = {
      openSubMenu: this.checkSubMenuOpenningHandler(
        this.props.history.location.pathname
      ),
    };
  }

  checkSubMenuOpenningHandler(pathname) {
    return (
      !!this.props.menu.submenus &&
      this.props.menu.submenus.filter((v) => v.url === pathname).length > 0
    );
  }

  componentDidMount() {
    this.historyEventListener = this.props.history.listen((location) => {
      this.setState({
        openSubMenu: this.checkSubMenuOpenningHandler(location.pathname),
      });
    });
  }

  componentWillUnmount() {
    if (this.historyEventListener) {
      this.historyEventListener();
    }
  }

  renderSubMenu(submenu) {
    return (
      <NavLink
        key={`${submenu.id}-nav-link`}
        className="nav-link"
        to={submenu.url}
      >
        <NavItem>
          <i className={submenu.icon}></i> {submenu.title}
        </NavItem>
      </NavLink>
    );
  }

  getDefaultUrl = (menu) => {
    return menu.url ? menu.url : menu.submenus ? menu.submenus[0].url : null;
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
            menu.submenus &&
            (() => <>{menu.submenus.map((sm) => this.renderSubMenu(sm))}</>)()}
        </div>
      </>
    );
  }
}
