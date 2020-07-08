import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { constants } from "../../constants/constants";
import SubMenu from "antd/lib/menu/SubMenu";
import "./SiderLinkList.css";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { SiderLinkListQuery } from "./__generated__/SiderLinkListQuery.graphql";

const query = graphql`
  query SiderLinkListQuery {
    categories {
      categoryId: id
      description
      label
    }
  }
`;

export const SiderLinkList: React.FC = () => {
  const { categories } = useLazyLoadQuery<SiderLinkListQuery>(query, {});

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
        {categories.map((category) => (
          <Menu.Item key={`${category.categoryId + category.description}`}>
            <Link to={`/category/${category.categoryId}`}>
              {category.description}
            </Link>
          </Menu.Item>
        ))}
        <Menu.Item>
          <Link to="/categories">{constants["SEEALLCATEGORY"]}</Link>
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
