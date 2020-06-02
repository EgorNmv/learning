import React, { Suspense } from "react";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";

const Main = React.lazy(() => import("../../pages/Main"));
const Category = React.lazy(() => import("../../pages/Category"));
const Training = React.lazy(() => import("../../pages/Training"));
const Help = React.lazy(() => import("../../pages/Help"));
const AllCategories = React.lazy(() => import("../../pages/AllCategories"));

export const Content: React.FC = () => (
  <Layout.Content
    style={{
      padding: "2rem",
      margin: "70px 0 0 200px",
      minHeight: "calc(100vh - 70px)",
    }}
  >
    <Suspense fallback={<Spin />}>
      <Route path="/" exact component={Main} />
      <Route path="/category" exact component={AllCategories} />
      <Route path="/category/:id" exact component={Category} />
      <Route path="/category/:id/training/:id" exact component={Training} />
      <Route path="/help" exact component={Help} />
    </Suspense>
  </Layout.Content>
);
