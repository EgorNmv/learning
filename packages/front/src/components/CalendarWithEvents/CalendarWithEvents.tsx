import React from "react";
import { Calendar } from "antd";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { CenteredText } from "../../hoc/CenteredText/CenteredText";
import { constants } from "../../constants/constants";

export const CalendarWithEvents: React.FC = () => {
  return (
    <>
      <div>
        <Calendar fullscreen={false} />
      </div>
      <CenteredText>
        <h2>{constants["UPCOMINGEVENTS"]}</h2>
        {new Array(10).fill("").map((_, index) => (
          <TrainingCard key={index} />
        ))}
      </CenteredText>
    </>
  );
};
