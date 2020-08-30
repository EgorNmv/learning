import React from "react";
import "./category.css";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { useParams } from "react-router-dom";
import { CategoryQuery } from "./__generated__/CategoryQuery.graphql";
import { Radio, DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { constants } from "../../constants/constants";
import moment from "moment";
import "moment/locale/ru";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { TrainingCard } from "../../components/TrainingCard/TrainingCard";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";

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

type Training = {
  trainingId: number;
  name: string;
  label: string | null;
  organizer: {
    name: string;
  };
  start: string | null;
  end: string | null;
  description: string;
  isDateSet: boolean;
};

moment.locale("ru");

const Category: React.FC = () => {
  const id = Number(useParams<{ id: string }>().id);
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
        ];
      });
    } else {
      setSelectedDate(null);
      setSortedTrainingList(sortedTraining as Training[]);
    }
  };

  React.useEffect(() => {
    sortedTraining && setSortedTrainingList(sortedTraining as Training[]);
  }, [sortedTraining]);

  return (
    <div className="category-page-content">
      <section style={{ flex: 1 }}>
        {/* <Breadcrumbs /> */}
        <h2 className="category-page-content__title">
          {category && category.description}
        </h2>
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
        <SortableTrainingList trainings={sortedTrainingsList as any} />
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
          <h2>{constants["UPCOMINGEVENTS"]}</h2>
          {comingTrainings.map((training) => (
            <TrainingCard training={training} placeInCalendar={true} />
          ))}
        </CenteredText>
      </section>
    </div>
  );
};

export default Category;
