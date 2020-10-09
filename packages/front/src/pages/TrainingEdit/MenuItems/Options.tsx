import React from "react";
import { TrainingForm } from "../../../components/TrainingForm/TrainingForm";
import { InputTraining } from "../__generated__/TrainingEditMutation.graphql";
import { TrainingMaterials } from "../../../components/TrainingMaterials/TrainingMaterials";

type OptionsProps = {
  dataForTrainingForm: InputTraining | null;
  onFinishTrainingForm: (data: InputTraining) => void;
};

export const Options: React.FC<OptionsProps> = ({
  dataForTrainingForm,
  onFinishTrainingForm,
}) => {
  return (
    <div>
      <TrainingForm
        formValues={dataForTrainingForm}
        onFinish={onFinishTrainingForm}
        isEditing={true}
      />
      <TrainingMaterials />
    </div>
  );
};
