import React from "react";
import "./SortableTrainingList.css";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { constants } from "../../constants/constants";

type SortableTrainingListProps = {
  trainings?: {
    trainingId?: number;
    name?: string;
    organizer?: { name: string };
    start?: string;
    end?: string;
    description?: string;
  }[];
};

export const SortableTrainingList: React.FC<SortableTrainingListProps> = ({
  trainings,
}) => {
  console.info(trainings);
  return (
    <div>
      <div className="sortable-training-list-filters">
        <span>{constants["SORTBY"]}</span>
        <span>{constants["BYNAME"]}</span>
        <span>{constants["BYDATE"]}</span>
        <span>{constants["BYRECOMENDATIONS"]}</span>
      </div>
      <div>
        {trainings &&
          trainings.map((training, index) => (
            <TrainingCard key={index} training={training} />
          ))}
      </div>
    </div>
  );
};
