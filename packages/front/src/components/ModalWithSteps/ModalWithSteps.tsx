import React from "react";
import { Modal, Steps, Button } from "antd";
import { useForm } from "antd/lib/form/util";
import { SelectionForm } from "./StepContents/SelectionForm/SelectionForm";
import {
  SelectionTable,
  Training,
} from "./StepContents/SelectionTable/SelectionTable";
import { DownloadForm } from "./StepContents/DownloadForm/DownloadForm";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { ModalWithStepsQuery } from "./__generated__/ModalWithStepsQuery.graphql";
import { ModalWithStepsMutation } from "./__generated__/ModalWithStepsMutation.graphql";

const query = graphql`
  query ModalWithStepsQuery(
    $categoryId: Float!
    $organizerId: Float!
    $targetAudienceId: Float!
    $formatId: Float!
    $startDate: String!
    $endDate: String!
  ) {
    trainingsForReport(
      categoryId: $categoryId
      organizerId: $organizerId
      targetAudienceId: $targetAudienceId
      formatId: $formatId
      startDate: $startDate
      endDate: $endDate
    ) {
      trainingId: id
      name
      organizer {
        name
      }
      start
      end
    }
  }
`;

const mutation = graphql`
  mutation ModalWithStepsMutation($ids: [Float!]!) {
    createReportByTrainingIds(ids: $ids)
  }
`;

export const ModalWithSteps: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [form] = useForm();
  const [trainingsWithStatuses, setTrainingsWithStatuses] = React.useState<
    Training[]
  >([]);
  const [commit, isInFlight] = useMutation<ModalWithStepsMutation>(mutation);
  const { trainingsForReport } = useLazyLoadQuery<ModalWithStepsQuery>(query, {
    categoryId: 1 || form.getFieldValue("category"),
    formatId: 1 || form.getFieldValue("trainingFormat"),
    organizerId: 1 || form.getFieldValue("organizer"),
    targetAudienceId: 1 || form.getFieldValue("targetAudience"),
    startDate: form.getFieldValue("startAndEndDates")
      ? form.getFieldValue("startAndEndDates")[0]
      : "null",
    endDate: form.getFieldValue("startAndEndDates")
      ? form.getFieldValue("startAndEndDates")[1]
      : "null",
  });
  const stepsContent: JSX.Element[] = [
    <SelectionForm form={form} />,
    <SelectionTable
      trainings={trainingsWithStatuses}
      onSelect={(selectedElementId: number) => {
        setTrainingsWithStatuses((prev) =>
          prev.map((training) =>
            training.trainingId === selectedElementId
              ? { ...training, status: !training.status }
              : training
          )
        );
      }}
    />,
    <DownloadForm />,
  ];

  React.useEffect(
    () =>
      setTrainingsWithStatuses(
        trainingsForReport.map((training, index) => ({
          ...training,
          id: index + 1,
          status: true,
        }))
      ),
    [trainingsForReport]
  );

  return (
    <Modal
      width={"80vw"}
      closable={false}
      visible={isOpen}
      onCancel={onClose}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentStep === 1 && (
            <Button
              type="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Назад
            </Button>
          )}
          {currentStep !== 2 && (
            <Button
              onClick={() => {
                setCurrentStep(currentStep + 1);
                commit({
                  variables: {
                    ids: trainingsWithStatuses.map((training) => {
                      if (training.status === true) {
                        return training.trainingId;
                      }
                    }) as number[],
                  },
                });
              }}
            >
              {currentStep === 0 ? "Далее" : "Сформировать отчёт"}
            </Button>
          )}
        </div>
      }
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Выгрузка заявок на события</h2>
          <Steps direction="vertical" current={currentStep}>
            <Steps.Step
              title="Шаг 1."
              description="Настройте тип выборки"
            ></Steps.Step>
            <Steps.Step
              title="Шаг 2."
              description="Выберите события для отчёта"
            ></Steps.Step>
            <Steps.Step
              title="Шаг 3."
              description="Скачайте готовый отчёт"
            ></Steps.Step>
          </Steps>
        </div>
        <div>{stepsContent[currentStep]}</div>
      </div>
    </Modal>
  );
};
