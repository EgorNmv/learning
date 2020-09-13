import React from "react";
import { Card, Table } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { ColumnsType } from "antd/es/table";
import "./user-profile-directories.css";

type Directory = {
  key: number;
  id: number;
  name: string;
  link: string;
};

const UserProfileDirectories: React.FC = () => {
  const columns: ColumnsType<Directory> = [
    {
      title: "№",
      dataIndex: "id",
      align: "center",
      width: "5rem"
    },
    {
      title: "Название",
      dataIndex: "name",
      render: (text, record) => (
        <Link className="directories-table__link" to={record.link}>
          {text}
        </Link>
      ),
    },
  ];
  const data: Directory[] = [
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
    <section className="user-directories">
      <Breadcrumbs />
      <h2>Справочники</h2>
      <Card className="directories-table__card">
        <Table<Directory>
          className="directories-table"
          bordered
          columns={columns}
          dataSource={data}
          onHeaderRow={(column) => {
            return {
              className: "directories-table__header",
            };
          }}
          pagination={false}
          rowClassName="directories-table__row"
        />
      </Card>
    </section>
  );
};

export default UserProfileDirectories;
