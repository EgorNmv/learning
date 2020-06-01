import React from "react";
import "./Sider.css";
import { Layout } from "antd";
import { SiderLinkList } from "../SiderLinkList/SiderLinkList";
import { THEME } from "../../constants/theme";

export const Sider: React.FC = () => (
  <Layout.Sider style={{ background: THEME.mainColor }}>
    <div className="sider-content">
      <header>
        <div className="sider-title-circle"></div>
        <div className="sider-title-text">
          <span>Банк России</span>
        </div>
      </header>
      <main>
        <SiderLinkList />
      </main>
    </div>
  </Layout.Sider>
);
