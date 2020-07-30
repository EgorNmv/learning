import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { constants } from "../../constants/constants";
import SubMenu from "antd/lib/menu/SubMenu";
import "./sider-link-list.css";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { SiderLinkListQuery } from "./__generated__/SiderLinkListQuery.graphql";
// import { FixedSizeList } from "react-window";

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

  // const CategoryRow: React.FC<{ index: number; style: any }> = ({
  //   index,
  //   style,
  // }) => {
  //   console.info(style);
  //   return (
  //     <div style={style}>
  //       <Menu.Item
  //         key={`${
  //           categories[index].categoryId + categories[index].description
  //         }`}
  //       >
  //         <Link to={`/category/${categories[index].categoryId}`}>
  //           {categories[index].description}
  //         </Link>
  //       </Menu.Item>
  //     </div>
  //   );
  // };

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
        {/* <FixedSizeList
          className="fixed-size-list"
          height={150}
          itemCount={categories.length}
          itemSize={35}
          width={300}
        >
          {CategoryRow}
        </FixedSizeList> */}
        {categories.map((category) => {
          if (!category) {
            return null;
          }
          return (
            <Menu.Item
              key={`${category.categoryId + category.description}`}
              className="submenu-item__category"
            >
              <Link to={`/category/${category.categoryId}`}>
                {category.description}
              </Link>
            </Menu.Item>
          );
        })}
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
