import { Network, Environment, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import getFetch from "./utils/fetch";
import React, { Suspense } from "react";
import { Layout, Spin, ConfigProvider } from "antd";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Sider } from "./components/Sider/Sider";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Security } from "@okta/okta-react";
import config from "./oktaConfig";
import ruRU from "antd/es/locale/ru_RU";
import { useOktaAuth } from "@okta/okta-react";
import { MainWrapper } from "./hoc/MainWrapper/MainWrapper";

const Logic = () => {
  const { authState } = useOktaAuth();
  const source = new RecordSource();
  const store = new Store(source);
  const environment = new Environment({
    network: Network.create(
      getFetch(
        `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/`,
        authState.accessToken
      )
    ),
    store,
  });

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<Spin className="centred-spin" />}>
        <MainWrapper>
          <ConfigProvider locale={ruRU}>
            <Layout>
              <Sider />
              <Layout>
                <Sider />
                <Layout>
                  <Header />
                  <Suspense
                    fallback={
                      <Spin className="centred-spin__with-header-and-sider" />
                    }
                  >
                    <Content />
                  </Suspense>
                </Layout>
              </Layout>
            </Layout>
          </ConfigProvider>
        </MainWrapper>
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

const ComponentWithAccessToHistory = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/auth");
  };

  return (
    <Security {...config} onAuthRequired={customAuthHandler}>
      <Logic />
    </Security>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ComponentWithAccessToHistory />
    </BrowserRouter>
  );
};

export default App;
