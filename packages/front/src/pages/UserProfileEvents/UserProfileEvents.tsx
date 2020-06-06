import React from "react";
import { Table, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserProfileEvents: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Название",
      dataIndex: "name",
    },
    {
      title: "Даты",
      dataIndex: "dates",
    },
    {
      title: "Заявки / Отзывы / Рекомендации",
      dataIndex: "trainingStatus",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: any) => (
        <>
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link to="/">
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large" }}>
            <Link to="/">
              <DeleteOutlined />
            </Link>
          </span>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      id: 1,
      name: "Основы Python",
      dates: "14 мая 2020 - 16 мая 2020",
      trainingStatus: "87 / 15 / 9",
    },
  ];

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>События</h1>
        </div>
        <div>
          <Button>Выгрузить в XLS</Button>
          <Button type="primary">
            <Link to="/profile/trainings/create">Создать событие</Link>
          </Button>
        </div>
      </div>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileEvents;
