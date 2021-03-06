import React from "react";
import { Modal, Steps, Button, Divider } from "antd";
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
import "./modal-with-steps.css";

const query = graphql`
  query ModalWithStepsQuery(
    $categoryId: Float!
    $organizerId: Float!
    $targetAudienceId: Float!
    $formatId: Float!
    $startDate: String
    $endDate: String
    $withTrainingsWithoutDate: Boolean!
  ) {
    trainingsForReport(
      categoryId: $categoryId
      organizerId: $organizerId
      targetAudienceId: $targetAudienceId
      formatId: $formatId
      startDate: $startDate
      endDate: $endDate
      withTrainingsWithoutDate: $withTrainingsWithoutDate
    ) {
      trainingId: id
      name
      organizer {
        name
      }
      start
      end
      isDateSet
    }
  }
`;

const mutation = graphql`
  mutation ModalWithStepsMutation(
    $ids: [Float!]!
    $onlyAllTrainingsReport: Boolean!
  ) {
    createReportByTrainingIds(ids: $ids) @skip(if: $onlyAllTrainingsReport)
    createReportOnAllEvents @include(if: $onlyAllTrainingsReport)
  }
`;

export const ModalWithSteps: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [form] = useForm();
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [
    filterFieldsForTrainings,
    setFilterFieldsForTrainings,
  ] = React.useState<{
    category: number;
    format: number;
    organizer: number;
    target: number;
    start: string | null;
    end: string | null;
    withTrainingsWithoutDate: boolean;
  }>({
    category: 0,
    format: 0,
    organizer: 0,
    target: 0,
    start: null,
    end: null,
    withTrainingsWithoutDate: false,
  });
  const [trainingsWithStatuses, setTrainingsWithStatuses] = React.useState<
    Training[]
  >([]);
  const [
    isReportGenerationAvalible,
    setIsReportGenerationAvalible,
  ] = React.useState<boolean>(true);
  const [reportFilename, setReportFileName] = React.useState<string | null>(
    null
  );
  const [commit, isInFlight] = useMutation<ModalWithStepsMutation>(mutation);
  const { trainingsForReport } = useLazyLoadQuery<ModalWithStepsQuery>(
    query,
    {
      categoryId: filterFieldsForTrainings.category,
      formatId: filterFieldsForTrainings.format,
      organizerId: filterFieldsForTrainings.organizer,
      targetAudienceId: filterFieldsForTrainings.target,
      startDate: filterFieldsForTrainings.start,
      endDate: filterFieldsForTrainings.end,
      withTrainingsWithoutDate:
        filterFieldsForTrainings.withTrainingsWithoutDate,
    },
    { fetchPolicy: "network-only" }
  );

  const onClickNextButton = (): void => {
    if (currentStep === 1) {
      const ids: number[] = trainingsWithStatuses
        .map((training) => {
          if (training.status === true) {
            return training.trainingId;
          }
        })
        .filter(Boolean) as number[];
      if (ids && ids.length > 0) {
        setIsReportGenerationAvalible(true);
        setCurrentStep(currentStep + 1);
        commit({
          variables: {
            ids,
            onlyAllTrainingsReport: false,
          },
          onCompleted: (response) => {
            if (response.createReportByTrainingIds) {
              setReportFileName(response.createReportByTrainingIds);
            }
          },
        });
      } else {
        setIsReportGenerationAvalible(false);
      }
    } else if (currentStep === 0) {
      setCurrentStep(currentStep + 1);
      setFilterFieldsForTrainings({
        category: form.getFieldValue("category"),
        format: form.getFieldValue("trainingFormat"),
        organizer: form.getFieldValue("organizer"),
        target: form.getFieldValue("targetAudience"),
        start: form.getFieldValue("startAndEndDates")[0],
        end: form.getFieldValue("startAndEndDates")[1],
        withTrainingsWithoutDate: form.getFieldValue(
          "withTrainingsWithoutDate"
        ),
      });
    }
  };

  const onClickBackButton = (): void => {
    setCurrentStep(currentStep - 1);
  };

  const onChangeStatusOfTraining = (selectedElementId: number) => {
    setTrainingsWithStatuses((prev) =>
      prev.map((training) =>
        training.trainingId === selectedElementId
          ? { ...training, status: !training.status }
          : training
      )
    );
  };

  const onGenerateReportOnAllTrainings = (): void => {
    setCurrentStep(2);
    commit({
      variables: { onlyAllTrainingsReport: true, ids: [] },
      onCompleted: (response) => {
        if (response.createReportOnAllEvents) {
          setReportFileName(response.createReportOnAllEvents);
        }
      },
    });
  };

  const stepsContent: JSX.Element[] = [
    <SelectionForm form={form} onClickNext={onClickNextButton} />,
    <SelectionTable
      trainings={trainingsWithStatuses}
      onSelect={onChangeStatusOfTraining}
      onClickNext={onClickNextButton}
      onClickBack={onClickBackButton}
      isReportGenerationAvalible={isReportGenerationAvalible}
    />,
    <DownloadForm
      isDownloadBtnDisabled={isInFlight}
      filename={reportFilename}
    />,
  ];

  React.useEffect(
    () =>
      setTrainingsWithStatuses(
        trainingsForReport.map(
          (training, index) =>
            ({
              ...training,
              id: index + 1,
              status: true,
            } as Training)
        )
      ),
    [trainingsForReport]
  );

  return (
    <Modal
      closable={true}
      closeIcon={
        <span className="steps-modal__all__close-ico" onClick={onClose}>
          Закрыть
        </span>
      }
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      className="steps-modal__all"
    >
      <div className="steps-modal">
        <div className="steps-modal__left-part">
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
          <Divider />
          <Steps>
            <Steps.Step
              status="finish"
              title="Отчёт по всем событиям"
            ></Steps.Step>
          </Steps>
          <Button
            className="report-modal__cancel-btn report-modal__all-trainings-btn"
            onClick={onGenerateReportOnAllTrainings}
          >
            Сгенерировать
          </Button>
        </div>
        <div className="steps-modal__right-part">
          {stepsContent[currentStep]}
        </div>
      </div>
    </Modal>
  );
};
