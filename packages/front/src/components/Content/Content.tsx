import React, { Suspense } from "react";
import { Layout, Spin } from "antd";
import { Route, Switch } from "react-router-dom";
import "./Content.css";

//TODO: EVENT aka TRAINING

const Auth = React.lazy(() => import("../../pages/Auth/Auth"));
const Registration = React.lazy(() =>
  import("../../pages/Registration/Registration")
);
const Main = React.lazy(() => import("../../pages/Main/Main"));
const Category = React.lazy(() => import("../../pages/Category/Category"));
const Training = React.lazy(() => import("../../pages/Training/Training"));
const Help = React.lazy(() => import("../../pages/Help/Help"));
const AllCategories = React.lazy(() =>
  import("../../pages/AllCategories/AllCategories")
);
const TrainingCreate = React.lazy(() =>
  import("../../pages/TrainingCreate/TrainingCreate")
);
const TrainingEdit = React.lazy(() =>
  import("../../pages/TrainingEdit/TrainingEdit")
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
const UserProfileDirectoriesUsers = React.lazy(() =>
  import("../../pages/UserProfileDirectories/Directories/Users/Users")
);
const UserProfileDirectoriesCategories = React.lazy(() =>
  import("../../pages/UserProfileDirectories/Directories/Categories/Categories")
);
const UserProfileDirectoriesCategoriesCreate = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/CategoriesCreate/CategoriesCreate"
  )
);
const UserProfileDirectoriesCategoriesEdit = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/CategoriesEdit/CategoriesEdit"
  )
);
const UserProfileDirectoriesTargetAudiences = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/TargetAudiences/TargetAudience"
  )
);
const UserProfileDirectoriesTargetAudiencesCreate = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/TargetAudiencesCreate/TargetAudiencesCreate"
  )
);
const UserProfileDirectoriesTargetAudiencesEdit = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/TargetAudiencesEdit/TargetAudiencesEdit"
  )
);
const UserProfileDirectoriesTrainingFormats = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/TrainingFormats/TrainingFormats"
  )
);
const UserProfileDirectoriesTrainingFormatsCreate = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/TrainingFormatsCreate/TrainingFormatsCreate"
  )
);
const UserProfileDirectoriesTrainingFormatsEdit = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/TrainingFormatsEdit/TrainingFormatsEdit"
  )
);
const UserProfileDirectoriesOrganizers = React.lazy(() =>
  import("../../pages/UserProfileDirectories/Directories/Organizers/Organizers")
);
const UserProfileDirectoriesOrganizersCreate = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/OrganizersCreate/OrganizersCreate"
  )
);
const UserProfileDirectoriesOrganizersEdit = React.lazy(() =>
  import(
    "../../pages/UserProfileDirectories/Directories/OrganizersEdit/OrganizersEdit"
  )
);
const NotFoundPage = React.lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export const Content: React.FC = () => (
  <Layout.Content className="all-main-content">
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/register" exact component={Registration} />
        <Route path="/" exact component={Main} />
        <Route path="/categories" exact component={AllCategories} />
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
    </Suspense>
  </Layout.Content>
);
