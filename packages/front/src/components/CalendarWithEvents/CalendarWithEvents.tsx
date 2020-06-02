import React from "react";
import { Calendar } from "antd";
import { TrainingCard } from "../TrainingCard/TrainingCard";

export const CalendarWithEvents: React.FC = () => {
  return (
    <div>
      <div>
        <Calendar fullscreen={false} />
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>Ближайшие события</h2>
        {new Array(10).fill("").map((_, index) => (
          <TrainingCard key={index} />
        ))}
      </div>
    </div>
  );
};
