import React from "react";
import { Table, Button } from "antd";

export const Requests: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "ФИО",
      dataIndex: "fullname",
    },
    {
      title: "Дата подачи",
      dataIndex: "date",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (text: string, record: any) => (
        <>
          <span>
            <Button type="link">Принять</Button>
          </span>
          <span>
            <Button type="link">Отклонить</Button>
          </span>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      id: 1,
      fullname: "Иванов Иван Петрович",
      date: "16 мая 2020",
      status: 1,
    },
  ];
  return (
    <div>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
