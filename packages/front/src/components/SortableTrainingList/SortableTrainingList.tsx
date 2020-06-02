import React from "react";
import { TrainingCard } from "../TrainingCard/TrainingCard";

export const SortableTrainingList: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <span>Сортировать по:</span>
        <span style={{ padding: "1rem" }}>Названию</span>
        <span style={{ padding: "1rem" }}>Дате</span>
        <span style={{ padding: "1rem" }}>Рекомендациям</span>
      </div>
      <div>
        {new Array(10).fill("").map((_, index) => (
          <TrainingCard key={index} />
        ))}
      </div>
    </div>
  );
};
