import React, { useState } from "react";
import { Calendar } from "antd";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { constants } from "../../constants/constants";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { CalendarWithEventsQuery } from "./__generated__/CalendarWithEventsQuery.graphql";
import moment from "moment";
import "moment/locale/ru";
import "./index.css";
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
  const [modifier, setModifier] = useState(0);
  const [date, setDate] = useState(new Date());
  date.setMonth(date.getMonth() + modifier);

  return (
    <>
      <div>
        <Calendar
          fullscreen={false}
          onSelect={(d) => {
            setDate(d.toDate());
          }}
          headerRender={() => (
            <div className="calendar-header">
              <span
                onClick={() => {
                  date.setMonth(date.getMonth() - 1);
                  setDate(new Date(date));
                }}
              >
                {"<"}
              </span>
              <img src={icon} />
              {moment(date).format("MMMM YYYY").toLocaleUpperCase()}
              <span
                onClick={() => {
                  date.setMonth(date.getMonth() + 1);
                  setDate(new Date(date));
                }}
              >
                {">"}
              </span>
            </div>
          )}
          value={moment(date)}
        />
      </div>
      <CenteredText>
        <h2>{constants["UPCOMINGEVENTS"]}</h2>
        {comingTrainings.map((training) => (
          <TrainingCard training={training} />
        ))}
      </CenteredText>
    </>
  );
};
