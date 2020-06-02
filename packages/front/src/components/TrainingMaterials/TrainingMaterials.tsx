import React from "react";
import { Card } from "antd";

export const TrainingMaterials: React.FC = () => {
  return (
    <div>
      <h2>Материалы</h2>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <span style={{ width: "50%" }}>
            <a href="#">document</a>
          </span>
          <span style={{ width: "50%" }}>
            <a href="#">document</a>
          </span>
          <span style={{ width: "50%" }}>
            <a href="#">document</a>
          </span>
          <span style={{ width: "50%" }}>
            <a href="#">document</a>
          </span>
        </div>
      </Card>
    </div>
  );
};
