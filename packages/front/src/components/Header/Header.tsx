import React from "react";
import { Layout, Select } from "antd";
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
        <Select defaultValue="Мальцева Полина" bordered={false}>
          <Select.Option value="1">Мой профиль</Select.Option>
          <Select.Option value="2">Мои заявки</Select.Option>
          <Select.Option value="3">Мои отзывы</Select.Option>
          <Select.Option value="4">Выход</Select.Option>
        </Select>
      </div>
    </section>
  </Layout.Header>
);
