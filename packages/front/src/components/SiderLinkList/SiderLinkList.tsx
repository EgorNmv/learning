import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { constants } from "../../constants/constants";
import SubMenu from "antd/lib/menu/SubMenu";
import "./SiderLinkList.css";

export const SiderLinkList: React.FC = () => {
  const allAvailableCategories: string[] = [
    "Программирование",
    "Дизайн",
    "Аналитика",
    "Управление",
    "Документирование",
    "Тестирование",
  ];

  return (
    <Menu className="sider-link-list-menu" mode="inline" theme="light">
      <Menu.Item key="main">
        <NavLink exact to="/" activeClassName="active-link">
          {constants["MAINPAGE"]}
        </NavLink>
      </Menu.Item>
      <SubMenu
        className="sider-link-list-menu-submenu"
        key="subMenu1"
        title={constants["CATEGORIES"]}
      >
        {allAvailableCategories.map((category, index) => (
          <Menu.Item>
            <Link to={`/category/${index + 1}`}>{category}</Link>
          </Menu.Item>
        ))}
        <Menu.Item>
          <Link to="/category">{constants["SEEALLCATEGORY"]}</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item>
        <NavLink exact to="/help" activeClassName="active-link">
          {constants["HELPPAGE"]}
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};
