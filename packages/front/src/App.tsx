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
import React, { Suspense } from "react";
import { Layout, Spin } from "antd";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Sider } from "./components/Sider/Sider";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Security } from "@okta/okta-react";
import config from "./oktaConfig";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { useOktaAuth } from '@okta/okta-react';

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
  const { authState } = useOktaAuth();

  const source = new RecordSource();
  const store = new Store(source);
  const environment = new Environment({
    network: Network.create(getFetch("http://localhost:4000/", authState.accessToken)),
    store,
  });

  resultOfPreloadQuery = preloadQuery<AppQuery>(
    environment,
    appQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content />
        </Layout>
      </Layout>
    </RelayEnvironmentProvider>
  );
}

const ComponentWithAccessToHistory = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/auth');
  };

  return (
    <Suspense fallback={<Spin />}>
      <Security
        {...config}
        onAuthRequired={customAuthHandler}
      >
        <Logic />
      </Security>
    </Suspense >
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ComponentWithAccessToHistory />
    </BrowserRouter>
  );
}

export default App;
