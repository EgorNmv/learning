import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";

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
    {
      key: 1,
      id: 1,
      name: "Категории",
      link: "/profile/directories/categories",
    },
    {
      key: 2,
      id: 2,
      name: "Организаторы",
      link: "/profile/directories/organizers",
    },
    {
      key: 3,
      id: 3,
      name: "Целевая аудитория",
      link: "/profile/directories/targetaudiences",
    },
    {
      key: 4,
      id: 4,
      name: "Формат обучения",
      link: "/profile/directories/trainingformats",
    },
  ];

  return (
    <section>
      <Breadcrumbs />
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
