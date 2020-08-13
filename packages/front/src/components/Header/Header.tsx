import React, { Suspense } from "react";
import { Layout, Select, Spin } from "antd";
import { SearchableInput } from "../SearchableInput/SearchableInput";
import "./Header.css";
import { UserMenuWithLinks } from "../UserMenuWithLinks/UserMenuWithLinks";
import { useOktaAuth } from "@okta/okta-react";

export const Header: React.FC = () => {
  const {
    authState: { isAuthenticated },
  } = useOktaAuth();

  return (
    <Layout.Header className="all-main-header">
      <Suspense fallback={<Spin />}>
        {isAuthenticated && (
          <>
            <div>
              <SearchableInput />
            </div>
            <div className="all-main-header-user-links">
              <UserMenuWithLinks />
            </div>
          </>
        )}
      </Suspense>
    </Layout.Header>
  );
};
