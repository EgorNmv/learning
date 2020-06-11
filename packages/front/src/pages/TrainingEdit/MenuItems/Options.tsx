import React from "react";
import { TrainingForm } from "../../../components/TrainingForm/TrainingForm";
import { TrainingFormValues } from "../../../utils/types";

type OptionsProps = {
  dataForTrainingForm: TrainingFormValues;
};

export const Options: React.FC<OptionsProps> = ({ dataForTrainingForm }) => {
  return (
    <div>
      <TrainingForm formValues={dataForTrainingForm} />
    </div>
  );
};
