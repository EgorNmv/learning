import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./TrainingCard.css";

type TrainingCardProps = {
  training?: {
    trainingId?: number;
    name?: string;
    organizer?: { name: string };
    start?: string;
    end?: string;
    description?: string;
  };
};

export const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  if (training) {
    const { trainingId, name, organizer, start, end, description } = training;

    return (
      <Card style={{ marginBottom: "1rem" }}>
        <div className="training-card-body">
          <div
            style={{
              width: "100px",
              height: "150px",
              background: "gray",
            }}
          />
          <div>
            <div>
              <Link to={`/category/1/training/${trainingId}`}>
                <h2>{name}</h2>
              </Link>
            </div>
            <div style={{ maxHeight: "3rem", overflow: "hidden" }}>
              <p>{description}</p>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Организатор: </span>
              <span>{organizer?.name}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Дата: </span>
              <span>
                {start} - {end}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  } else {
    return <Card>Нет трайнинга</Card>;
  }
};
