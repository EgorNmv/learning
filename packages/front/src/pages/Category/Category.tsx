import React from "react";
import "./category.css";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { useParams, Link, Redirect, useRouteMatch } from "react-router-dom";
import { CategoryQuery } from "./__generated__/CategoryQuery.graphql";
import { Radio, DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { constants } from "../../constants/constants";
import moment from "moment";
import "moment/locale/ru";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { TrainingCard } from "../../components/TrainingCard/TrainingCard";
import {
  addRoute,
  Breadcrumbs,
  useBreadCrumbContext,
} from "../../components/Breadcrumbs";

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
      isDateSet
      description
      organizer {
        name
      }
      listOfRequestsReviewsAndRecomends
      averageRating
      format {
        description
      }
      category {
        categoryId: id
        description
      }
    }
    category(id: $categoryId) {
      categoryId: id
      description
      label
    }
    comingTrainings {
      trainingId: id
      name
      label
      organizer {
        name
      }
      start
      end
      isDateSet
      description
    }
  }
`;

type Training = CategoryQuery["response"]["sortedTraining"][number];

moment.locale("ru");

const Category: React.FC = () => {
  const id = Number(useParams<{ id: string }>().id);
  const { url } = useRouteMatch();
  const { dispatch } = useBreadCrumbContext();
  const [sortBy, setSortBy] = React.useState<
    "name" | "createDate" | "recommends"
  >("name");
  const [sortOrder, setSortOrder] = React.useState<"ASC" | "DESC">("ASC");
  const [selectedDate, setSelectedDate] = React.useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [sortedTrainingsList, setSortedTrainingList] = React.useState<
    Training[]
  >([]);
  const sortOptionsMap: {
    [key: string]: string;
  } = {
    name: constants["BYNAME"],
    createDate: constants["BYDATE"],
    recommends: constants["BYRECOMENDATIONS"],
  };
  const { sortedTraining, category, comingTrainings } = useLazyLoadQuery<
    CategoryQuery
  >(query, {
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

  const onDateChanged = (values: [moment.Moment, moment.Moment]): void => {
    if (values) {
      const startSelectedDate = values[0].toDate();
      const endSelectedDate = values[1].toDate();

      startSelectedDate.setHours(0, 0, 0, 0);
      endSelectedDate.setHours(0, 0, 0, 0);

      setSelectedDate(values);
      setSortedTrainingList(() => {
        const trainingsWithoutDates = sortedTraining.filter(
          (training) => training.isDateSet === false
        );
        const trainingsWithDates = sortedTraining.filter(
          (training) => training.isDateSet === true
        );
        return [
          ...trainingsWithDates.filter((training) => {
            if (training.start && training.end) {
              const splittedArrayWithStartDate: number[] = training.start
                .split(".")
                .map(Number);
              const startTrainingDate: Date = new Date(
                splittedArrayWithStartDate[2],
                splittedArrayWithStartDate[1] - 1,
                splittedArrayWithStartDate[0]
              );
              const splittedArrayWithEndDate: number[] = training.end
                .split(".")
                .map(Number);
              const endTrainingDate: Date = new Date(
                splittedArrayWithEndDate[2],
                splittedArrayWithEndDate[1] - 1,
                splittedArrayWithEndDate[0]
              );
              const startTrainingTime = startTrainingDate.getTime();
              const endTrainingTime = endTrainingDate.getTime();
              const startSelectedTime = startSelectedDate.getTime();
              const endSelectedTime = endSelectedDate.getTime();

              if (
                (startTrainingTime >= startSelectedTime &&
                  startTrainingTime <= endSelectedTime) ||
                (startTrainingTime <= startSelectedTime &&
                  endTrainingTime >= endSelectedTime) ||
                (startTrainingTime >= startSelectedTime &&
                  endTrainingTime <= endSelectedTime) ||
                (endTrainingTime >= startSelectedTime &&
                  endTrainingTime <= endSelectedTime)
              ) {
                return true;
              } else {
                return false;
              }
            }
          }),
          ...trainingsWithoutDates,
        ] as Training[];
      });
    } else {
      setSelectedDate(null);
      setSortedTrainingList(sortedTraining as Training[]);
    }
  };

  React.useEffect(() => {
    sortedTraining && setSortedTrainingList(sortedTraining as Training[]);
  }, [sortedTraining]);

  React.useEffect(() => {
    dispatch(addRoute(url, category ? category.description : ""));
  }, [category]);

  if (!id || !category) {
    return <Redirect to="/" />;
  }

  return (
    <div className="category-page-content">
      <section style={{ flex: 1 }}>
        <Breadcrumbs />
        <h2 className="category-page-content__title">
          {category && category.description}
        </h2>
        <div className="category-page-content__sorted-btns">
          <span>{constants["SORTBY"]} </span>
          <Radio.Group
            onChange={(e: RadioChangeEvent) => setSortBy(e.target.value)}
            defaultValue="name"
          >
            <Radio value="name" onClick={onClick}>
              {renderLabelWithSortOrder("name")}
            </Radio>
            <Radio value="createDate" onClick={onClick}>
              {renderLabelWithSortOrder("createDate")}
            </Radio>
            <Radio value="recommends" onClick={onClick}>
              {renderLabelWithSortOrder("recommends")}
            </Radio>
          </Radio.Group>
        </div>
        <SortableTrainingList trainings={sortedTrainingsList} />
      </section>
      <section className="category-page-content-calendar">
        <CenteredText>
          <h2>Выберите интересующие даты</h2>
          <DatePicker.RangePicker
            format={"DD.MM.YYYY"}
            size="large"
            value={selectedDate}
            onChange={onDateChanged as any}
          />
          <div className="category-page-content-calendar__coming-training-title">
            <h3>{constants["UPCOMINGEVENTS"]}</h3>
            <Link to="/categories">Смотреть все</Link>
          </div>
          <div className="category-page-content-calendar__trainings">
            {comingTrainings.map((training) => (
              <TrainingCard
                key={`${training.name}${training.trainingId}`}
                training={training}
                placeInCalendar
              />
            ))}
          </div>
        </CenteredText>
      </section>
    </div>
  );
};

export default Category;
