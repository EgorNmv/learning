// import {
//   Network,
//   Environment,
//   RecordSource,
//   Store,
//   graphql,
// } from "relay-runtime";
// import { RelayEnvironmentProvider, preloadQuery } from "react-relay/hooks";
// import getFetch from "./utils/fetch";
// import { AppQuery } from "./__generated__/AppQuery.graphql";

// const source = new RecordSource();
// const store = new Store(source);
// const environment = new Environment({
//   network: Network.create(getFetch("http://localhost:4000/")),
//   store,
// });

// export const query = graphql`
//   query AppQuery {
//     users {
//       id
//       fullname
//       login
//     }
//   }
// `;

// export const result = preloadQuery<AppQuery>(
//   environment,
//   query,
//   {},
//   { fetchPolicy: "store-or-network" }
// );
import React from "react";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Sider } from "./components/Sider/Sider";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";

function App() {
  return (
    // <RelayEnvironmentProvider environment={environment}>
    <BrowserRouter>
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
