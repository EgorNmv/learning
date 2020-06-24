import React from "react";

export const Auth = React.lazy(() => import("../../pages/Auth/Auth"));
export const Registration = React.lazy(() =>
    import("../../pages/Registration/Registration")
);
export const Main = React.lazy(() => import("../../pages/Main/Main"));
export const Category = React.lazy(() => import("../../pages/Category/Category"));
export const Training = React.lazy(() => import("../../pages/Training/Training"));
export const Help = React.lazy(() => import("../../pages/Help/Help"));
export const AllCategories = React.lazy(() =>
    import("../../pages/AllCategories/AllCategories")
);
export const TrainingCreate = React.lazy(() =>
    import("../../pages/TrainingCreate/TrainingCreate")
);
export const TrainingEdit = React.lazy(() =>
    import("../../pages/TrainingEdit/TrainingEdit")
);
export const UserProfile = React.lazy(() =>
    import("../../pages/UserProfile/UserProfile")
);
export const UserProfileEditing = React.lazy(() =>
    import("../../pages/UserProfileEditing/UserProfileEditing")
);
export const UserProfileRequests = React.lazy(() =>
    import("../../pages/UserProfileRequests/UserProfileRequests")
);
export const UserProfileReviews = React.lazy(() =>
    import("../../pages/UserProfileReviews/UserProfileReviews")
);
export const UserProfileRecomendations = React.lazy(() =>
    import("../../pages/UserProfileRecomendations/UserProfileRecomendations")
);
export const UserProfileEvents = React.lazy(() =>
    import("../../pages/UserProfileEvents/UserProfileEvents")
);
export const UserProfileDirectories = React.lazy(() =>
    import("../../pages/UserProfileDirectories/UserProfileDirectories")
);
export const UserProfileDirectoriesUsers = React.lazy(() =>
    import("../../pages/UserProfileDirectories/Directories/Users/Users")
);
export const UserProfileDirectoriesCategories = React.lazy(() =>
    import("../../pages/UserProfileDirectories/Directories/Categories/Categories")
);
export const UserProfileDirectoriesCategoriesCreate = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/CategoriesCreate/CategoriesCreate"
    )
);
export const UserProfileDirectoriesCategoriesEdit = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/CategoriesEdit/CategoriesEdit"
    )
);
export const UserProfileDirectoriesTargetAudiences = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/TargetAudiences/TargetAudience"
    )
);
export const UserProfileDirectoriesTargetAudiencesCreate = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/TargetAudiencesCreate/TargetAudiencesCreate"
    )
);
export const UserProfileDirectoriesTargetAudiencesEdit = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/TargetAudiencesEdit/TargetAudiencesEdit"
    )
);
export const UserProfileDirectoriesTrainingFormats = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/TrainingFormats/TrainingFormats"
    )
);
export const UserProfileDirectoriesTrainingFormatsCreate = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/TrainingFormatsCreate/TrainingFormatsCreate"
    )
);
export const UserProfileDirectoriesTrainingFormatsEdit = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/TrainingFormatsEdit/TrainingFormatsEdit"
    )
);
export const UserProfileDirectoriesOrganizers = React.lazy(() =>
    import("../../pages/UserProfileDirectories/Directories/Organizers/Organizers")
);
export const UserProfileDirectoriesOrganizersCreate = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/OrganizersCreate/OrganizersCreate"
    )
);
export const UserProfileDirectoriesOrganizersEdit = React.lazy(() =>
    import(
        "../../pages/UserProfileDirectories/Directories/OrganizersEdit/OrganizersEdit"
    )
);
export const NotFoundPage = React.lazy(() =>
    import("../../pages/NotFoundPage/NotFoundPage")
);