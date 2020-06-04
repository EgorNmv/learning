import React, { Suspense } from "react";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";
import "./Content.css";

const Main = React.lazy(() => import("../../pages/Main/Main"));
const Category = React.lazy(() => import("../../pages/Category/Category"));
const Training = React.lazy(() => import("../../pages/Training/Training"));
const Help = React.lazy(() => import("../../pages/Help/Help"));
const AllCategories = React.lazy(() =>
  import("../../pages/AllCategories/AllCategories")
);
const CreateTraining = React.lazy(() =>
  import("../../pages/CreateTraining/CreateTraining")
);

export const Content: React.FC = () => (
  <Layout.Content className="all-main-content">
    <Suspense fallback={<Spin />}>
      <Route path="/" exact component={Main} />
      <Route path="/category" exact component={AllCategories} />
      <Route path="/category/:id" exact component={Category} />
      <Route path="/category/:id/training/:id" exact component={Training} />
      <Route
        path="/profile/trainings/create"
        exact
        component={CreateTraining}
      />
      <Route path="/help" exact component={Help} />
    </Suspense>
  </Layout.Content>
);
