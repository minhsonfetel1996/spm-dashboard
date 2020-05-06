import React, { useState, useEffect } from "react";
import { NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function MenuComponent(props) {

  const checkSubMenuOpenningHandler = (pathname) => {
    return (
      !!props.menu.submenus &&
      props.menu.submenus.filter((v) => v.url === pathname).length > 0
    );
  };

  const [openSubMenu, setOpenSubMenu] = useState(
    checkSubMenuOpenningHandler(props.history.location.pathname)
  );

  useEffect(() => {
    const listen = props.history.listen((location) => {
      setOpenSubMenu(checkSubMenuOpenningHandler(location.pathname));
    });
    return () => {
      if (listen) {
        listen();
      }
    };
  });

  const renderSubMenu = (submenu) => {
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
  };

  const getDefaultUrl = (menu) => {
    return menu.url ? menu.url : menu.submenus ? menu.submenus[0].url : null;
  };

  return (
    <>
      <NavLink
        className="nav-link"
        to={getDefaultUrl(props.menu)}
        onClick={() => {
          setOpenSubMenu(true);
        }}
      >
        <NavItem>
          <i className={props.menu.icon}></i> {props.menu.title}
        </NavItem>
      </NavLink>
      <div className="ml-3">
        {openSubMenu &&
          props.menu.submenus &&
          (() => {
            return <>{props.menu.submenus.map((sm) => renderSubMenu(sm))}</>;
          })()}
      </div>
    </>
  );
}
