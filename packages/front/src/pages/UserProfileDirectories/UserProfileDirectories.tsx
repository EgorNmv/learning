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
    {
      key: 2,
      id: 2,
      name: "Категории",
      link: "/profile/directories/categories",
    },
    {
      key: 3,
      id: 3,
      name: "Организаторы",
      link: "/profile/directories/organizers",
    },
    {
      key: 4,
      id: 4,
      name: "Целевая аудитория",
      link: "/profile/directories/targetaudiences",
    },
    {
      key: 5,
      id: 5,
      name: "Формат обучения",
      link: "/profile/directories/trainingformats",
    },
  ];

  return (
    <section>
      <span>
        <h1>Справочники</h1>
      </span>
      <Card>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
    </section>
  );
};

export default UserProfileDirectories;
