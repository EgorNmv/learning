import React, { ReactElement } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Content.css";
import { Alert } from "../Alert/Alert";
import {
  Auth,
  Main,
  Help,
  Training,
  Category,
  Registration,
  TrainingEdit,
  AllCategories,
  TrainingCreate,
  UserProfileEvents,
  UserProfileReviews,
  UserProfileRequests,
  UserProfileEditing,
  UserProfileDirectories,
  UserProfileRecomendations,
  UserProfileDirectoriesUsers,
  UserProfileDirectoriesOrganizers,
  UserProfileDirectoriesCategories,
  UserProfileDirectoriesOrganizersEdit,
  UserProfileDirectoriesCategoriesEdit,
  UserProfileDirectoriesTrainingFormats,
  UserProfileDirectoriesTargetAudiences,
  UserProfileDirectoriesOrganizersCreate,
  UserProfileDirectoriesCategoriesCreate,
  UserProfileDirectoriesTargetAudiencesEdit,
  UserProfileDirectoriesTrainingFormatsEdit,
  UserProfileDirectoriesTrainingFormatsCreate,
  UserProfileDirectoriesTargetAudiencesCreate,
} from "./pages";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import { UserContext } from "../../hoc/UserContext/UserContext";

export const Content: React.FC = () => {
  const user = React.useContext(UserContext);
  const adminRoutes: ReactElement[] = [
    <SecureRoute
      path="/profile/trainings"
      exact
      component={UserProfileEvents}
    />,
    <SecureRoute
      path="/profile/directories"
      exact
      component={UserProfileDirectories}
    />,
    <SecureRoute
      path="/profile/directories/users"
      exact
      component={UserProfileDirectoriesUsers}
    />,
    <SecureRoute
      path="/profile/directories/categories"
      exact
      component={UserProfileDirectoriesCategories}
    />,
    <SecureRoute
      path="/profile/directories/categories/create"
      exact
      component={UserProfileDirectoriesCategoriesCreate}
    />,
    <SecureRoute
      path="/profile/directories/categories/edit/:id"
      exact
      component={UserProfileDirectoriesCategoriesEdit}
    />,
    <SecureRoute
      path="/profile/directories/targetaudiences"
      exact
      component={UserProfileDirectoriesTargetAudiences}
    />,
    <SecureRoute
      path="/profile/directories/targetaudiences/create"
      exact
      component={UserProfileDirectoriesTargetAudiencesCreate}
    />,
    <SecureRoute
      path="/profile/directories/targetaudiences/edit/:id"
      exact
      component={UserProfileDirectoriesTargetAudiencesEdit}
    />,
    <SecureRoute
      path="/profile/directories/trainingformats"
      exact
      component={UserProfileDirectoriesTrainingFormats}
    />,
    <SecureRoute
      path="/profile/directories/trainingformats/create"
      exact
      component={UserProfileDirectoriesTrainingFormatsCreate}
    />,
    <SecureRoute
      path="/profile/directories/trainingformats/edit/:id"
      exact
      component={UserProfileDirectoriesTrainingFormatsEdit}
    />,
    <SecureRoute
      path="/profile/directories/organizers"
      exact
      component={UserProfileDirectoriesOrganizers}
    />,
    <SecureRoute
      path="/profile/directories/organizers/create"
      exact
      component={UserProfileDirectoriesOrganizersCreate}
    />,
    <SecureRoute
      path="/profile/directories/organizers/edit/:id"
      exact
      component={UserProfileDirectoriesOrganizersEdit}
    />,
    <SecureRoute
      path="/profile/trainings/create"
      exact
      component={TrainingCreate}
    />,
    <SecureRoute
      path="/profile/trainings/edit/:id"
      exact
      component={TrainingEdit}
    />,
  ];
  const [routes, setRoutes] = React.useState<ReactElement[]>([
    <Route path="/implicit/callback" component={LoginCallback} />,
    <Route path="/auth" exact component={Auth} />,
    <Route path="/register" exact component={Registration} />,
    <SecureRoute path="/" exact component={Main} />,
    <SecureRoute path="/categories" exact component={AllCategories} />,
    <SecureRoute path="/category/:id" exact component={Category} />,
    <SecureRoute
      path="/category/:categoryId/training/:trainingId"
      exact
      component={Training}
    />,
    <SecureRoute
      path="/profile/editing"
      exact
      component={UserProfileEditing}
    />,
    <SecureRoute
      path="/profile/requests"
      exact
      component={UserProfileRequests}
    />,
    <SecureRoute
      path="/profile/reviews"
      exact
      component={UserProfileReviews}
    />,
    <SecureRoute
      path="/profile/recomendations"
      exact
      component={UserProfileRecomendations}
    />,
    <SecureRoute path="/help" exact component={Help} />,
  ]);

  React.useEffect(() => {
    if (user && user.group && user.group === "0") {
      setRoutes((prev) => [...prev, ...adminRoutes]);
    }
  }, [user]);

  return (
    <Layout.Content className="all-main-content">
      <Alert />
      <Switch>
        {routes.map((route) => route)}
        <Redirect to="/" />
      </Switch>
    </Layout.Content>
  );
};
