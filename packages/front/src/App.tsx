import {
  Network,
  Environment,
  RecordSource,
  Store,
  graphql,
} from "relay-runtime";
import { RelayEnvironmentProvider, preloadQuery } from "react-relay/hooks";
import getFetch from "./utils/fetch";
import { AppQuery } from "./__generated__/AppQuery.graphql";
import React, { Suspense, useContext, useEffect } from "react";
import { Layout, Spin, ConfigProvider } from "antd";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Sider } from "./components/Sider/Sider";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Security } from "@okta/okta-react";
import config from "./oktaConfig";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { UserContext } from "./hoc/UserContext/UserContext";
import { useOktaFetchedUser } from "./utils/utils";
import ruRU from 'antd/es/locale/ru_RU';
import { useOktaAuth } from "@okta/okta-react";
import { MainWrapper } from "./hoc/MainWrapper/MainWrapper";

export const appQuery = graphql`
  query AppQuery {
    categories {
      categoryId: id
      description
      label
    }
  }
`;

export let resultOfPreloadQuery: PreloadedQuery<AppQuery, any>;

const Logic = () => {
  const { authState, authService } = useOktaAuth();
  console.log();
  const ctx = useContext(UserContext);




  const [user, setUser] = React.useState<any | null>(null);

  const source = new RecordSource();
  const store = new Store(source);
  const environment = new Environment({
    network: Network.create(
      getFetch("http://localhost:4000/", authState.accessToken)
    ),
    store,
  });

  resultOfPreloadQuery = preloadQuery<AppQuery>(
    environment,
    appQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );

  React.useEffect(() => {

    if (!authState.isAuthenticated) {
      setUser(null);
    } else {
      console.log(authService);
      authService.getUser().then((info: any) => {
        console.log(info);
        setUser(info);

      });
    }
  }, [authState, authService]);


  return (
    <RelayEnvironmentProvider environment={environment}>
      <MainWrapper>
        <ConfigProvider locale={ruRU}>
          <Layout>

            <Sider />
            <Layout>
              <Sider />
              <Layout>

                <Header />
                <Content />
              </Layout>
            </Layout>
          </Layout>
        </ConfigProvider>
      </MainWrapper>
    </RelayEnvironmentProvider>
  );
};

const ComponentWithAccessToHistory = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/auth");
  };

  return (
    <Suspense fallback={<Spin />}>
      <Security {...config} onAuthRequired={customAuthHandler}>
        <Logic />
      </Security>
    </Suspense>
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
