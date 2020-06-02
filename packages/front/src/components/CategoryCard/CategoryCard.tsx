import React from "react";
import { Card } from "antd";

export const CategoryCard: React.FC = () => {
  return (
    <Card
      title="Card title"
      bordered={false}
      style={{ width: 300, marginBottom: "1rem" }}
    >
      Категория
    </Card>
  );
};
