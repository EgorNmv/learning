import React from "react";
import { Table, Switch } from "antd";

type Training = {
  trainingId: number;
  name: string;
  organizer: { description: string };
  start: string;
  end: string;
  status: boolean;
};

type SelectionTableProps = {
  trainings: Training[];
  onSelect: () => void;
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
    { title: "Организатор", dataIndex: "oraganizer" },
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
        <Switch checked={record.status} onChange={onSelect} />
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
