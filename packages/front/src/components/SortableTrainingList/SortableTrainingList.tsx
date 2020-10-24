import React from "react";
import "./SortableTrainingList.css";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { CategoryQuery } from "../../pages/Category/__generated__/CategoryQuery.graphql";

type SortableTrainingListProps = {
  trainings: CategoryQuery["response"]["sortedTraining"][number][];
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
            training={training as any}
            placeInCategoryPage
          />
        ))}
    </div>
  );
};
