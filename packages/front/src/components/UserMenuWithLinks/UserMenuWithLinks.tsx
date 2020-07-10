import React from "react";
import { Menu, Dropdown } from "antd";
import { constants } from "../../constants/constants";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { UserContext } from "../../hoc/UserContext/UserContext";

export const UserMenuWithLinks: React.FC = () => {
  const { authState, authService } = useOktaAuth();
  const user = React.useContext(UserContext);
  const [group, setGroup] = React.useState<string>("1");

  const login = async () => authService.login("/");
  const logout = async () => authService.logout("/auth");

  const menu = (
    <Menu>
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
      {group === "0" && (
        <Menu.Item key="4">
          <Link to="/profile/trainings">{constants["EVENTS"]}</Link>
        </Menu.Item>
      )}
      {group === "0" && (
        <Menu.Item key="5">
          <Link to="/profile/directories">{constants["DIRECTORIES"]}</Link>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="6">
        {!authState.isPending && !authState.isAuthenticated && (
          <span onClick={login}>Войти</span>
        )}
        {authState.isAuthenticated && (
          <span onClick={logout}>{constants["EXIT"]}</span>
        )}
      </Menu.Item>
    </Menu>
  );

  React.useEffect(() => {
    user && setGroup(user.group);
  }, [user]);

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <span>
          {user && user.name}
          <DownOutlined
            style={{
              marginLeft: "20px",
            }}
          />
        </span>
      </Dropdown>
    </>
  );
};
