import React from "react";
import { Card } from "antd";
import "./CategoryCard.css";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  category?: {
    categoryId?: number;
    description?: string;
    label?: string | null;
  };
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  if (category) {
    return (
      <div
        className="category-card"
        style={
          category?.label
            ? {
                backgroundImage: `url(${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/category/${category.label})`,
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <div className="layer"></div>
        <div className="category-link">
          <h3>
            <Link to={`/category/${category.categoryId}`}>
              {category.description}
            </Link>
          </h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
