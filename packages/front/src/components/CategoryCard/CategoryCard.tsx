import React from "react";
import { Card } from "antd";
import "./CategoryCard.css";

export const CategoryCard: React.FC = () => {
  return (
    <Card title="Card title" bordered={false} className="category-card">
      Категория
    </Card>
  );
};
