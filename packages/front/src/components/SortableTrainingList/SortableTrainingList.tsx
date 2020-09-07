import React from "react";
import "./SortableTrainingList.css";
import { TrainingCard } from "../TrainingCard/TrainingCard";

type SortableTrainingListProps = {
  trainings: {
    trainingId: number;
    name: string;
    label: string | null;
    organizer: { name: string };
    start: string | null;
    end: string | null;
    isDateSet: boolean;
    description: string;
    listOfRequestsReviewsAndRecomends: number[] | null;
    averageRating: number | null;
    format: {
      description: string;
    };
  }[];
};

export const SortableTrainingList: React.FC<SortableTrainingListProps> = ({
  trainings,
}) => {
  return (
    <div>
      {trainings &&
        trainings.map((training) => (
          <TrainingCard
            key={`${training.trainingId}${training.name}`}
            training={training}
            placeInCategoryPage
          />
        ))}
    </div>
  );
};
