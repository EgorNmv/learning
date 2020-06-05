import React from "react";
import { Layout, Select } from "antd";
import { SearchableInput } from "../SearchableInput/SearchableInput";
import "./Header.css";
import { UserMenuWithLinks } from "../UserMenuWithLinks/UserMenuWithLinks";

export const Header: React.FC = () => (
  <Layout.Header className="all-main-header">
    <div>
      <SearchableInput />
    </div>
    <div className="all-main-header-user-links">
      <UserMenuWithLinks />
    </div>
  </Layout.Header>
);
