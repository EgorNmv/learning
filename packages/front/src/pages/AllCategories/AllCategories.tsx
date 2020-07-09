import React from "react";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { AllCategoriesQuery } from "./__generated__/AllCategoriesQuery.graphql";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";

const query = graphql`
  query AllCategoriesQuery {
    trainings {
      trainingId: id
      name
      label
      description
      start
      end
      organizer {
        name
      }
    }
  }
`;

const AllCategories: React.FC = () => {
  const { trainings } = useLazyLoadQuery<AllCategoriesQuery>(query, {});

  return (
    <section>
      <h2>Все события</h2>
      <SortableTrainingList trainings={trainings as any} />
    </section>
  );
};

export default AllCategories;
