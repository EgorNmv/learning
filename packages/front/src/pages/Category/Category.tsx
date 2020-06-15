import React from "react";
import "./Category.css";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";
import { CalendarWithEvents } from "../../components/CalendarWithEvents/CalendarWithEvents";
import {
  usePreloadedQuery,
  graphql,
  useLazyLoadQuery,
} from "react-relay/hooks";
import { AppQuery } from "../../__generated__/AppQuery.graphql";
import { appQuery, resultOfPreloadQuery } from "../../App";
import { useParams } from "react-router-dom";
import { Category as CategoryType } from "../../utils/types";
import { CategoryQuery } from "./__generated__/CategoryQuery.graphql";

const query = graphql`
  query CategoryQuery($categoryId: Float!) {
    trainingsByCategoryId(categoryId: $categoryId) {
      trainingId: id
      name
      start
      end
      description
      organizer {
        name
      }
    }
  }
`;

const Category: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { categories } = usePreloadedQuery<AppQuery>(
    appQuery,
    resultOfPreloadQuery
  );
  const currentCategory: CategoryType | undefined = categories.find(
    (category) => category.categoryId === id
  );
  const { trainingsByCategoryId } = useLazyLoadQuery<CategoryQuery>(query, {
    categoryId: id,
  });

  if (!currentCategory) {
    return (
      <div>{`Что-то пошло не так, категории с id ${id} не существует`}</div>
    );
  }

  return (
    <div className="category-page-content">
      <section>
        <h2>{currentCategory.description}</h2>
        <SortableTrainingList trainings={trainingsByCategoryId as any} />
      </section>
      <section className="category-page-content-calendar">
        <CalendarWithEvents />
      </section>
    </div>
  );
};

export default Category;
