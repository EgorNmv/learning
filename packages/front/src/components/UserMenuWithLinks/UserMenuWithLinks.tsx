import React from "react";
import { Select, Menu, Dropdown } from "antd";
import { constants } from "../../constants/constants";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const UserMenuWithLinks: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">{constants["MYPROFILE"]}</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/profile/requests">{constants["MYREQUESTS"]}</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/profile/reviews">{constants["MYREVIEWS"]}</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/profile/recomendations">
          {constants["MYRECOMENDATIONS"]}
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/profile/trainings">{constants["EVENTS"]}</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/profile/directories">{constants["DIRECTORIES"]}</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">{constants["EXIT"]}</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <span>
          Мальцева Полина <DownOutlined />
        </span>
      </Dropdown>
    </>
  );
};
