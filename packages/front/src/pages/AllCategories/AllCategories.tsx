import React from "react";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { AllCategoriesQuery } from "./__generated__/AllCategoriesQuery.graphql";

const query = graphql`
  query AllCategoriesQuery {
    trainings {
      trainingId: id
      name
      label
      description
    }
  }
`;

const AllCategories: React.FC = () => {
  const queryResult = useLazyLoadQuery<AllCategoriesQuery>(
    query,
    {},
    { fetchPolicy: "store-or-network" }
  );

  React.useEffect(() => console.info(queryResult));

  return <div>AllCATEGORIES PAGE</div>;
};

export default AllCategories;
