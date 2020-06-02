import React from "react";
import { Card, Carousel } from "antd";

export const UserCard: React.FC = () => {
  return (
    <Card>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              background: "grey",
            }}
          />
          <div>
            <span>Мальцева Полина</span>
            <span>14 мая 2020</span>
          </div>
        </div>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          sed officia libero enim expedita. Laborum assumenda quisquam fuga
          cumque, perspiciatis culpa necessitatibus eum sit libero nobis id
          labore corporis porro.
        </div>
      </div>
    </Card>
  );
};
