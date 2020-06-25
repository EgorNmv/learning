import React from "react";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { AllCategoriesQuery } from "./__generated__/AllCategoriesQuery.graphql";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";
import { useOktaAuth } from '@okta/okta-react';

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
  const { authState, authService } = useOktaAuth();

  console.info("authState", authState);
  console.info("authService", authService);
  authService.getUser().then((res: any) => console.info(res));

  return (
    <section>
      <h2>Все категории</h2>
      <SortableTrainingList trainings={trainings as any} />
    </section>
  );
};

export default AllCategories;
