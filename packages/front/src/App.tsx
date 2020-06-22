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
import { BrowserRouter } from "react-router-dom";
import { Sider } from "./components/Sider/Sider";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";

const source = new RecordSource();
const store = new Store(source);
const environment = new Environment({
  network: Network.create(getFetch("http://localhost:4000/")),
  store,
});

export const appQuery = graphql`
  query AppQuery {
    categories {
      categoryId: id
      description
      label
    }
  }
`;

export const resultOfPreloadQuery = preloadQuery<AppQuery>(
  environment,
  appQuery,
  {},
  { fetchPolicy: "store-or-network" }
);

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <Suspense fallback={<Spin />}>
          <Layout>
            <Sider />
            <Layout>
              <Header />
              <Content />
            </Layout>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}

export default App;
