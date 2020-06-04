import React from "react";
import { Card } from "antd";
import "./UserCard.css";

export const UserCard: React.FC = () => {
  return (
    <Card>
      <div className="user-card-body">
        <div className="user-card-body-user">
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
