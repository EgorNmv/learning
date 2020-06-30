import React from "react";
import { Calendar } from "antd";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { constants } from "../../constants/constants";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { CalendarWithEventsQuery } from "./__generated__/CalendarWithEventsQuery.graphql";

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

export const CalendarWithEvents: React.FC = () => {
  const { comingTrainings } = useLazyLoadQuery<CalendarWithEventsQuery>(
    query,
    {}
  );

  return (
    <>
      <div>
        <Calendar fullscreen={false} />
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
