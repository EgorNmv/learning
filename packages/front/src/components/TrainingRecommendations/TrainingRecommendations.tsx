import React from "react";
import { Carousel } from "antd";
import { UserCard } from "../UserCard/UserCard";

export const TrainingRecommendations: React.FC = () => {
  return (
    <div>
      <h2>Рекомендации</h2>
      <Carousel>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </Carousel>
    </div>
  );
};
