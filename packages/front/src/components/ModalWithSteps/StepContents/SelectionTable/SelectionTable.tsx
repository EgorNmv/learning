import React from "react";
import { Table, Switch } from "antd";

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
};

export const SelectionTable: React.FC<SelectionTableProps> = ({
  trainings,
  onSelect,
}) => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Событие",
      dataIndex: "name",
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
      <Table
        bordered
        columns={columns}
        dataSource={trainings}
        rowKey={(record: Training): string =>
          `${record.trainingId}${record.name}`
        }
      />
    </>
  );
};
