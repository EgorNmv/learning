import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import "./Content.css";
import {
  Auth,
  Main,
  Help,
  Training,
  Category,
  UserProfile,
  Registration,
  NotFoundPage,
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
import { useOktaAuth, SecureRoute, LoginCallback } from '@okta/okta-react';


export const Content: React.FC = () => {
  const { authState, authService } = useOktaAuth();

  return (
    <Layout.Content className="all-main-content">
      <Switch>
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/register" exact component={Registration} />
        <Route path="/" exact component={Main} />
        <SecureRoute path="/categories" exact component={AllCategories} />
        <Route path="/category/:id" exact component={Category} />
        <Route
          path="/category/:categoryId/training/:trainingId"
          exact
          component={Training}
        />
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
          path="/profile/directories/users"
          exact
          component={UserProfileDirectoriesUsers}
        />
        <Route
          path="/profile/directories/categories"
          exact
          component={UserProfileDirectoriesCategories}
        />
        <Route
          path="/profile/directories/categories/create"
          exact
          component={UserProfileDirectoriesCategoriesCreate}
        />
        <Route
          path="/profile/directories/categories/edit/:id"
          exact
          component={UserProfileDirectoriesCategoriesEdit}
        />
        <Route
          path="/profile/directories/targetaudiences"
          exact
          component={UserProfileDirectoriesTargetAudiences}
        />
        <Route
          path="/profile/directories/targetaudiences/create"
          exact
          component={UserProfileDirectoriesTargetAudiencesCreate}
        />
        <Route
          path="/profile/directories/targetaudiences/edit/:id"
          exact
          component={UserProfileDirectoriesTargetAudiencesEdit}
        />
        <Route
          path="/profile/directories/trainingformats"
          exact
          component={UserProfileDirectoriesTrainingFormats}
        />
        <Route
          path="/profile/directories/trainingformats/create"
          exact
          component={UserProfileDirectoriesTrainingFormatsCreate}
        />
        <Route
          path="/profile/directories/trainingformats/edit/:id"
          exact
          component={UserProfileDirectoriesTrainingFormatsEdit}
        />
        <Route
          path="/profile/directories/organizers"
          exact
          component={UserProfileDirectoriesOrganizers}
        />
        <Route
          path="/profile/directories/organizers/create"
          exact
          component={UserProfileDirectoriesOrganizersCreate}
        />
        <Route
          path="/profile/directories/organizers/edit/:id"
          exact
          component={UserProfileDirectoriesOrganizersEdit}
        />
        <Route
          path="/profile/trainings/create"
          exact
          component={TrainingCreate}
        />
        <Route
          path="/profile/trainings/edit/:id"
          exact
          component={TrainingEdit}
        />
        <Route path="/help" exact component={Help} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout.Content>
  )
};
