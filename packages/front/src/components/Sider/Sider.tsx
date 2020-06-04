import React from "react";
import "./Sider.css";
import { Layout } from "antd";
import { SiderLinkList } from "../SiderLinkList/SiderLinkList";
import { constants } from "../../constants/constants";

export const Sider: React.FC = () => (
  <Layout.Sider className="all-sider-layout">
    <div className="sider-content">
      <div>
        <div className="sider-title-circle"></div>
        <div className="sider-title-text">
          <span>{constants["BANK"]}</span>
        </div>
      </div>
      <div>
        <SiderLinkList />
      </div>
    </div>
  </Layout.Sider>
);
