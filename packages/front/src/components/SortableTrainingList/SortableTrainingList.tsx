import React from "react";
import "./SortableTrainingList.css";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { constants } from "../../constants/constants";

type SortableTrainingListProps = {
  trainings?: {
    trainingId?: number;
    name?: string;
    label: string | null;
    organizer?: { name: string };
    start?: string;
    end?: string;
    description?: string;
  }[];
};

export const SortableTrainingList: React.FC<SortableTrainingListProps> = ({
  trainings,
}) => {
  return (
    <div>
      <div className="sortable-training-list-filters"></div>
      <div>
        {trainings &&
          trainings.map((training, index) => (
            <TrainingCard key={index} training={training} />
          ))}
      </div>
    </div>
  );
};
