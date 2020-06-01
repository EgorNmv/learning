import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { THEME } from "../../constants/theme";
import SubMenu from "antd/lib/menu/SubMenu";
import "./SiderLinkList.css";

export const SiderLinkList: React.FC = () => (
  <Menu
    style={{ background: THEME.mainColor, borderRight: 0 }}
    mode="inline"
    theme="light"
  >
    <Menu.Item key="main">
      <NavLink exact to="/" activeClassName="active-link">
        Главная
      </NavLink>
    </Menu.Item>
    <SubMenu
      key="subMenu1"
      title="Категории"
      style={{ color: "rgb(146, 232, 255)" }}
    >
      <Menu.Item>
        <Link to="/category/1">Программирование</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/category/2">Дизайн</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/category/3">Аналитика</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/category/3">Управление</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/category/3">Документирование</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/category/3">Тестирование</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/category">Смотреть все</Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item>
      <NavLink exact to="/help" activeClassName="active-link">
        Помощь
      </NavLink>
    </Menu.Item>
  </Menu>
);
