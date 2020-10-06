import React from "react";
import { Table, Switch, Button } from "antd";

export type Training = {
  trainingId: number;
  name: string;
  organizer: { name: string };
  start: string;
  end: string;
  status: boolean;
  id: number;
};

type SelectionTableProps = {
  trainings: Training[];
  onSelect: (selectedElementId: number) => void;
  onClickNext: () => void;
  onClickBack: () => void;
  isReportGenerationAvalible: boolean;
};

export const SelectionTable: React.FC<SelectionTableProps> = ({
  trainings,
  onSelect,
  onClickNext,
  onClickBack,
  isReportGenerationAvalible,
}) => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
      width: "5rem",
    },
    {
      title: "Событие",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: "Организатор",
      dataIndex: "oraganizer",
      render: (text: string, record: Training) => record.organizer.name,
    },
    {
      title: "Даты",
      dataIndex: "dates",
      render: (text: string, record: Training) =>
        `${record.start}-${record.end}`,
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (text: string, record: Training) => (
        <Switch
          checked={record.status}
          onChange={() => onSelect(record.trainingId)}
        />
      ),
    },
  ];

  return (
    <>
      <p>
        По выбранным настройкам найдено {trainings.length} событий. Выберите
        необходимые события для отчета из списка ниже:
      </p>
      {!isReportGenerationAvalible && (
        <p>Для генерации отчёта необходимо выбрать хотя бы одно событие</p>
      )}
      <Table
        bordered
        columns={columns}
        dataSource={trainings}
        rowKey={(record: Training): string =>
          `${record.trainingId}${record.name}`
        }
        pagination={{ pageSize: 5 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          className="report-modal__cancel-btn report-modal__all-trainings-btn"
          type="ghost"
          onClick={onClickBack}
        >
          Назад
        </Button>
        <Button
          className="report-modal__next-btn report-modal__all-trainings-btn"
          onClick={onClickNext}
        >
          Сформировать отчёт
        </Button>
      </div>
    </>
  );
};
