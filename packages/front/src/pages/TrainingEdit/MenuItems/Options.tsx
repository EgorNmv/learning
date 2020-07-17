import React from "react";
import { TrainingForm } from "../../../components/TrainingForm/TrainingForm";
import { TrainingFormValues } from "../../../utils/types";
import { InputTraining } from "../__generated__/TrainingEditMutation.graphql";
import { TrainingMaterials } from "../../../components/TrainingMaterials/TrainingMaterials";

type OptionsProps = {
  dataForTrainingForm: TrainingFormValues | null;
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
