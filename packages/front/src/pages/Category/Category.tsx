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
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { constants } from "../../constants/constants";

const query = graphql`
  query CategoryQuery(
    $sortBy: String!
    $sortOrder: String!
    $categoryId: Float!
  ) {
    sortedTraining(
      sortBy: $sortBy
      sortOrder: $sortOrder
      categoryId: $categoryId
    ) {
      trainingId: id
      name
      label
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
  const [sortBy, setSortBy] = React.useState<
    "name" | "createDate" | "recommends"
  >("name");
  const [sortOrder, setSortOrder] = React.useState<"ASC" | "DESC">("ASC");
  const sortOptionsMap: {
    [key: string]: string;
  } = {
    name: constants["BYNAME"],
    createDate: constants["BYDATE"],
    recommends: constants["BYRECOMENDATIONS"],
  };
  const { sortedTraining } = useLazyLoadQuery<CategoryQuery>(query, {
    categoryId: id,
    sortBy,
    sortOrder,
  });

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (
      (e.target as HTMLInputElement).value &&
      (e.target as HTMLInputElement).value === sortBy
    ) {
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC");
    }
  };

  const renderLabelWithSortOrder = (value: string) => {
    if (value === sortBy) {
      return sortOrder === "ASC"
        ? `${sortOptionsMap[value]} ↓`
        : `${sortOptionsMap[value]} ↑`;
    } else {
      return sortOptionsMap[value];
    }
  };

  if (!currentCategory) {
    return (
      <div>{`Что-то пошло не так, категории с id ${id} не существует`}</div>
    );
  }

  return (
    <div className="category-page-content">
      <section style={{ flex: 1 }}>
        <h2>{currentCategory.description}</h2>
        <span>{constants["SORTBY"]} </span>
        <Radio.Group
          onChange={(e: RadioChangeEvent) => setSortBy(e.target.value)}
          defaultValue="name"
          buttonStyle="solid"
        >
          <Radio.Button value="name" onClick={onClick}>
            {renderLabelWithSortOrder("name")}
          </Radio.Button>
          <Radio.Button value="createDate" onClick={onClick}>
            {renderLabelWithSortOrder("createDate")}
          </Radio.Button>
          <Radio.Button value="recommends" onClick={onClick}>
            {renderLabelWithSortOrder("recommends")}
          </Radio.Button>
        </Radio.Group>
        <SortableTrainingList trainings={sortedTraining as any} />
      </section>
      <section className="category-page-content-calendar">
        <CalendarWithEvents />
      </section>
    </div>
  );
};

export default Category;
