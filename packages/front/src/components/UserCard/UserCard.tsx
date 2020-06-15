import React from "react";
import { Card } from "antd";
import "./UserCard.css";

type UserCardProps = {
  feedback: {
    user: {
      fullname: string;
      photo: string | null;
    };
    text: string;
    date: string;
  };
};

export const UserCard: React.FC<UserCardProps> = ({ feedback }) => {
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
          <div style={{ padding: "0 1rem" }}>
            <p>{feedback.user.fullname}</p>
            <p>{feedback.date}</p>
          </div>
        </div>
        <div>{feedback.text}</div>
      </div>
    </Card>
  );
};
