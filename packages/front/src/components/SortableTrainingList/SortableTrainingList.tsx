import React from "react";
import "./SortableTrainingList.css";
import { TrainingCard } from "../TrainingCard/TrainingCard";
import { constants } from "../../constants/constants";

export const SortableTrainingList: React.FC = () => {
  return (
    <div>
      <div className="sortable-training-list-filters">
        <span>{constants["SORTBY"]}</span>
        <span>{constants["BYNAME"]}</span>
        <span>{constants["BYDATE"]}</span>
        <span>{constants["BYRECOMENDATIONS"]}</span>
      </div>
      <div>
        {new Array(10).fill("").map((_, index) => (
          <TrainingCard key={index} />
        ))}
      </div>
    </div>
  );
};
