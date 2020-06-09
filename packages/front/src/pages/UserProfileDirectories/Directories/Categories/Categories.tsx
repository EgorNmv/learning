import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "categoryId",
    },
    {
      title: "Название",
      dataIndex: "description",
    },
  ];
  const data = [{}];

  return (
    <section>
      <span>
        <h1>Категории</h1>
      </span>
      <Button type="link">
        <Link to="/profile/directories/categories/create">
          Создать категорию
        </Link>
      </Button>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default Categories;
