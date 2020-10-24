import React from "react";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { AllCategoriesQuery } from "./__generated__/AllCategoriesQuery.graphql";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import "./all-categories.css";

const query = graphql`
  query AllCategoriesQuery {
    trainings {
      trainingId: id
      name
      label
      description
      start
      end
      isDateSet
      organizer {
        name
      }
      listOfRequestsReviewsAndRecomends
      averageRating
      format {
        description
      }
      category {
        description
      }
    }
  }
`;

const AllCategories: React.FC = () => {
  const { trainings } = useLazyLoadQuery<AllCategoriesQuery>(query, {});

  return (
    <section className="all-categories-page">
      <Breadcrumbs />
      <h2>Все события</h2>
      <SortableTrainingList trainings={trainings as any} />
    </section>
  );
};

export default AllCategories;
