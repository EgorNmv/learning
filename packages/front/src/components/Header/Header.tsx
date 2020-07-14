import React, { Suspense } from "react";
import { Layout, Select, Spin } from "antd";
import { SearchableInput } from "../SearchableInput/SearchableInput";
import "./Header.css";
import { UserMenuWithLinks } from "../UserMenuWithLinks/UserMenuWithLinks";
import { useOktaAuth } from "@okta/okta-react";

export const Header: React.FC = () => {
  const { authState } = useOktaAuth();

  return (
    <Layout.Header className="all-main-header">
      <Suspense fallback={<Spin />}>
        {authState.isAuthenticated && (
          <div>
            <SearchableInput />
          </div>
        )}
        {authState.isAuthenticated && (
          <div className="all-main-header-user-links">
            {authState.isAuthenticated && <UserMenuWithLinks />}
          </div>
        )}
      </Suspense>
    </Layout.Header>
  );
};
