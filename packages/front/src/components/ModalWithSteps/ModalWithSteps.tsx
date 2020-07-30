import React from "react";
import { Modal, Steps, Button } from "antd";
import { useForm } from "antd/lib/form/util";
import { SelectionForm } from "./StepContents/SelectionForm/SelectionForm";
import { SelectionTable } from "./StepContents/SelectionTable/SelectionTable";
import { DownloadForm } from "./StepContents/DownloadForm/DownloadForm";

export const ModalWithSteps: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [form] = useForm();
  const stepsContent: JSX.Element[] = [
    <SelectionForm form={form} />,
    <SelectionTable trainings={[]} onSelect={() => {}} />,
    <DownloadForm />,
  ];

  return (
    <Modal
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
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              {currentStep === 0 ? "Далее" : "Сформировать отчёт"}
            </Button>
          )}
        </div>
      }
    >
      <div style={{ display: "flex" }}>
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
