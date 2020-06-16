import React from "react";
import { Card } from "antd";
import "./CategoryCard.css";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  category?: {
    categoryId?: number;
    description?: string;
  };
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  if (category) {
    return (
      <Card bordered={false} className="category-card">
        <h3>
          <Link to={`/category/${category.categoryId}`}>
            {category.description}
          </Link>
        </h3>
      </Card>
    );
  } else {
    return null;
  }
};
