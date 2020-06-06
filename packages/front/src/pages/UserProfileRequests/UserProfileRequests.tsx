import React from "react";
import { Table, Card } from "antd";

const UserProfileRequests: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Событие",
      dataIndex: "training",
    },
    {
      title: "Дата подачи",
      dataIndex: "filingDate",
    },
    {
      title: "Статус",
      dataIndex: "status",
    },
  ];
  const data = [
    {
      key: 1,
      id: 1,
      training: "Основы python",
      filingDate: "12 мая 2020",
      status: "В обработке",
    },
    {
      key: 2,
      id: 2,
      training: "Основы python",
      filingDate: "12 мая 2020",
      status: "Принята",
    },
    {
      key: 3,
      id: 3,
      training: "Основы python",
      filingDate: "12 мая 2020",
      status: "Отклонена",
    },
  ];

  return (
    <section>
      <span>
        <h1>Мои заявки</h1>
      </span>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileRequests;
