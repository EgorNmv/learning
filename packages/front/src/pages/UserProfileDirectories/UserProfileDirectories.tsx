import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";

const UserProfileDirectories: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Название",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <Button type="link">
          <Link to={record.link}>{text}</Link>
        </Button>
      ),
    },
  ];
  const data = [
    { key: 1, id: 1, name: "Пользователи", link: "/profile/directories/users" },
    { key: 2, id: 2, name: "Категории" },
    { key: 2, id: 2, name: "Организаторы" },
    { key: 2, id: 2, name: "Целевая аудитория" },
    { key: 2, id: 2, name: "Формат обучения" },
  ];

  return (
    <section>
      <span>
        <h1>Справочники</h1>
      </span>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileDirectories;
