import React from "react";
import { Card } from "antd";
import "./CategoryCard.css";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  category?: {
    categoryId?: number;
    description?: string;
    label: string | null;
  };
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  if (category) {
    return (
      <Card
        bordered={false}
        className="category-card"
        style={{ backgroundImage: `url(http://localhost:4000/category/${category.label})` }}
      >
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
