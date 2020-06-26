import React from "react";
import "./Sider.css";
import { Layout } from "antd";
import { SiderLinkList } from "../SiderLinkList/SiderLinkList";
import { constants } from "../../constants/constants";
import { useOktaAuth } from "@okta/okta-react";

export const Sider: React.FC = () => {
  const { authState } = useOktaAuth();

  return (
    <Layout.Sider className="all-sider-layout">
      <div className="sider-content">
        <div>
          <div className="sider-title-circle"></div>
          <div className="sider-title-text">
            <span>{constants["BANK"]}</span>
          </div>
        </div>
        {authState.isAuthenticated
          && <div>
            <SiderLinkList />
          </div>
        }
      </div>
    </Layout.Sider>
  )
};
