import React from "react";
import "./Sider.css";
import { Layout } from "antd";
import { SiderLinkList } from "../SiderLinkList/SiderLinkList";
import { constants } from "../../constants/constants";
import { useOktaAuth } from "@okta/okta-react";
import logoSvg from './logo_rcr.svg';
export const Sider: React.FC = () => {
  const { authState } = useOktaAuth();

  return (
    <Layout.Sider className="all-sider-layout" width={367}>
      <div className="sider-content">
        <div className="logo-box">

        </div>
        {authState.isAuthenticated
          && <div className="sider-links">
            <SiderLinkList />
          </div>
        }
        <div className="sider-img-container">
          <img src={logoSvg} style={{
            width: '104px',
          }} />
        </div>
      </div>
    </Layout.Sider>
  )
};
