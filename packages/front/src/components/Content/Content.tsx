import React, { Suspense } from "react";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";

const Main = React.lazy(() => import("../../pages/Main"));
const Category = React.lazy(() => import("../../pages/Category"));
const Help = React.lazy(() => import("../../pages/Help"));
const AllCategories = React.lazy(() => import("../../pages/AllCategories"));

export const Content: React.FC = () => (
  <Layout.Content style={{ padding: "2rem" }}>
    <Suspense fallback={<Spin />}>
      <Route path="/" exact component={Main} />
      <Route path="/category" exact component={AllCategories} />
      <Route path="/category/:id" exact component={Category} />
      <Route path="/help" exact component={Help} />
    </Suspense>
  </Layout.Content>
);
