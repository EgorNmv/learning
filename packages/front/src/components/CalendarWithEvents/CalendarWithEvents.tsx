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

moment.locale("ru");
export const CalendarWithEvents: React.FC = () => {
  const { comingTrainings } = useLazyLoadQuery<CalendarWithEventsQuery>(
    query,
    {}
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const renderSelectedDates = (date: moment.Moment): ReactNode => {
    let cellPainted: boolean = false;
    const dateInCell: Date = date.toDate();

    dateInCell.setHours(0, 0, 0, 0);

    const trainingsWithCurrentDate = comingTrainings.map((training) => {
      if (training) {
        const splittedArrayWithStartDate: number[] = training.start
          .split(".")
          .map(Number);
        const startTrainingDate: Date = new Date(
          splittedArrayWithStartDate[2],
          splittedArrayWithStartDate[1] - 1,
          splittedArrayWithStartDate[0]
        );
        if (startTrainingDate.getTime() === dateInCell.getTime()) {
          return training;
        }
      }
    });

    if (trainingsWithCurrentDate.filter(Boolean).length > 0) {
      cellPainted = true;
    }

    if (cellPainted) {
      return <div className="date-with-training" />;
    }
  };

  return (
    <>
      <div>
        <Calendar
          fullscreen={false}
          onSelect={(newDate: moment.Moment) => {
            setCurrentDate(newDate.toDate());
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
        {comingTrainings.map((training) => (
          <TrainingCard training={training} placeInCalendar={true} />
        ))}
      </CenteredText>
    </>
  );
};
