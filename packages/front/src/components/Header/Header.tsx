import React from "react";
import { Layout } from "antd";
import { SearchableInput } from "../SearchableInput/SearchableInput";
import { Menu } from "antd";

export const Header: React.FC = () => (
  <Layout.Header
    style={{
      background: "white",
      borderBottom: "1px solid rgb(109, 109, 109)",
    }}
  >
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <SearchableInput />
      </div>
      <div>
        <Menu mode="inline">
          <Menu.SubMenu key="sub1" title="Мальцева Полина">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </section>
  </Layout.Header>
);
