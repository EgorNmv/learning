import React, { Suspense } from "react";
import { Layout, Spin } from "antd";
import { Route } from "react-router-dom";
import "./Content.css";

//TODO: EVENT aka TRAINING

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
const UserProfile = React.lazy(() =>
  import("../../pages/UserProfile/UserProfile")
);
const UserProfileEditing = React.lazy(() =>
  import("../../pages/UserProfileEditing/UserProfileEditing")
);
const UserProfileRequests = React.lazy(() =>
  import("../../pages/UserProfileRequests/UserProfileRequests")
);
const UserProfileReviews = React.lazy(() =>
  import("../../pages/UserProfileReviews/UserProfileReviews")
);
const UserProfileRecomendations = React.lazy(() =>
  import("../../pages/UserProfileRecomendations/UserProfileRecomendations")
);
const UserProfileEvents = React.lazy(() =>
  import("../../pages/UserProfileEvents/UserProfileEvents")
);
const UserProfileDirectories = React.lazy(() =>
  import("../../pages/UserProfileDirectories/UserProfileDirectories")
);

export const Content: React.FC = () => (
  <Layout.Content className="all-main-content">
    <Suspense fallback={<Spin />}>
      <Route path="/" exact component={Main} />
      <Route path="/category" exact component={AllCategories} />
      <Route path="/category/:id" exact component={Category} />
      <Route path="/category/:id/training/:id" exact component={Training} />
      <Route path="/profile" exact component={UserProfile} />
      <Route path="/profile/editing" exact component={UserProfileEditing} />
      <Route path="/profile/requests" exact component={UserProfileRequests} />
      <Route path="/profile/reviews" exact component={UserProfileReviews} />
      <Route
        path="/profile/recomendations"
        exact
        component={UserProfileRecomendations}
      />
      <Route path="/profile/trainings" exact component={UserProfileEvents} />
      <Route
        path="/profile/directories"
        exact
        component={UserProfileDirectories}
      />
      <Route
        path="/profile/trainings/create"
        exact
        component={CreateTraining}
      />
      <Route path="/help" exact component={Help} />
    </Suspense>
  </Layout.Content>
);
