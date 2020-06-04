import React from "react";
import { Card } from "antd";
import "./TrainingMaterials.css";

export const TrainingMaterials: React.FC = () => {
  return (
    <>
      <h2>Материалы</h2>
      <Card>
        <div className="training-material-body">
          <span>
            <a href="#">document</a>
          </span>
          <span>
            <a href="#">document</a>
          </span>
          <span>
            <a href="#">document</a>
          </span>
          <span>
            <a href="#">document</a>
          </span>
        </div>
      </Card>
    </>
  );
};
