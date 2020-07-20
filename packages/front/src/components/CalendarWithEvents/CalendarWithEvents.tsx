import React, { useState, ReactNode } from "react";
import { Calendar } from "antd";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { constants } from "../../constants/constants";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { CalendarWithEventsQuery } from "./__generated__/CalendarWithEventsQuery.graphql";
import moment from "moment";
import "moment/locale/ru";
import "./calendar.css";
import icon from "./calendar.svg";

const query = graphql`
  query CalendarWithEventsQuery {
    comingTrainings {
      trainingId: id
      name
      label
      organizer {
        name
      }
      start
      end
      description
    }
  }
`;

type ComingTraining = {
  trainingId: number;
  name: string;
  label: string | null;
  organizer: {
    name: string;
  };
  start: string;
  end: string;
  description: string;
};

moment.locale("ru");

export const CalendarWithEvents: React.FC = () => {
  const { comingTrainings } = useLazyLoadQuery<CalendarWithEventsQuery>(
    query,
    {}
  );
  const [
    currentComingTrainingsList,
    setCurrentComingTrainingsList,
  ] = React.useState<ComingTraining[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [
    isCurrentDateOnceChanged,
    setIsCurrentDateOnceChanged,
  ] = React.useState<boolean>(false);

  const compareComingTrainingWithDate = (
    comingTrainingsList: ComingTraining[],
    compareDate: Date
  ): ComingTraining[] => {
    return comingTrainingsList.filter((training) => {
      if (training) {
        const splittedArrayWithStartDate: number[] = training.start
          .split(".")
          .map(Number);
        const startTrainingDate: Date = new Date(
          splittedArrayWithStartDate[2],
          splittedArrayWithStartDate[1] - 1,
          splittedArrayWithStartDate[0]
        );
        if (startTrainingDate.getTime() === compareDate.getTime()) {
          return true;
        } else {
          return false;
        }
      }
    });
  };

  const renderSelectedDates = (date: moment.Moment): ReactNode => {
    let isCellSHouldBePainted: boolean = false;
    const dateInCell: Date = date.toDate();

    dateInCell.setHours(0, 0, 0, 0);

    const trainingsWithCurrentDate = compareComingTrainingWithDate(
      comingTrainings as ComingTraining[],
      dateInCell
    );

    if (trainingsWithCurrentDate.filter(Boolean).length > 0) {
      isCellSHouldBePainted = true;
    }

    if (isCellSHouldBePainted) {
      return <div className="date-with-training" />;
    }
  };

  React.useEffect(() => {
    comingTrainings &&
      setCurrentComingTrainingsList(
        comingTrainings.filter(Boolean) as ComingTraining[]
      );
  }, [comingTrainings]);

  React.useEffect(() => {
    isCurrentDateOnceChanged &&
      comingTrainings &&
      setCurrentComingTrainingsList(
        compareComingTrainingWithDate(
          comingTrainings as ComingTraining[],
          currentDate
        )
      );
  }, [currentDate]);

  return (
    <>
      <div>
        <Calendar
          fullscreen={false}
          onSelect={(newDate: moment.Moment) => {
            setIsCurrentDateOnceChanged(true);
            let date = newDate.toDate();
            date.setHours(0, 0, 0, 0);
            setCurrentDate(date);
          }}
          dateCellRender={renderSelectedDates}
          headerRender={() => (
            <div className="calendar-header">
              <span
                onClick={() => {
                  currentDate.setMonth(currentDate.getMonth() - 1);
                  setCurrentDate(new Date(currentDate));
                }}
              >
                {"<"}
              </span>
              <img src={icon} />
              {moment(currentDate).format("MMMM YYYY").toLocaleUpperCase()}
              <span
                onClick={() => {
                  currentDate.setMonth(currentDate.getMonth() + 1);
                  setCurrentDate(new Date(currentDate));
                }}
              >
                {">"}
              </span>
            </div>
          )}
          value={moment(currentDate)}
        />
      </div>
      <CenteredText>
        <h2>{constants["UPCOMINGEVENTS"]}</h2>
        {currentComingTrainingsList.map((training) => (
          <TrainingCard training={training} placeInCalendar={true} />
        ))}
        {currentComingTrainingsList.length === 0 && (
          <span>В данный день нет событий</span>
        )}
      </CenteredText>
    </>
  );
};
