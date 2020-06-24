import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { constants } from "../../constants/constants";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';

export const UserMenuWithLinks: React.FC = () => {
  const { authState, authService } = useOktaAuth();

  const login = async () => authService.login('/');
  const logout = async () => authService.logout('/');

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
      <Menu.Item key="6">
        {
          !authState.isPending
          && !authState.isAuthenticated
          && <span onClick={login}>
            Войти
          </span>
        }
        {
          authState.isAuthenticated
          && <span onClick={logout}>
            {constants["EXIT"]}
          </span>
        }
      </Menu.Item>
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
