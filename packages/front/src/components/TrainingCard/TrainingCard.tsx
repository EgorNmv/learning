import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./TrainingCard.css";
import { UploadedPicture } from "../UploadedPicture/UploadedPicture";

type TrainingCardProps = {
  training?: {
    trainingId?: number;
    name?: string;
    label: string | null;
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
      
        <div className="training-card">
          {training.label
            ? <UploadedPicture
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "206px",
                maxWidth: "206px",
                borderRadius: "15px 0px 0px 15px",
              }}
              filename={training.label}
              imgType="training"
            />
            : <div
              style={{
                width: "100px",
                height: "150px",
                background: "gray",
              }}
            />}
          <div className="training-info">
            <div className="training-name">
              <Link to={`/category/1/training/${trainingId}`}>
                <h2>{name}</h2>
              </Link>
            </div>
            <div className="training-desc" style={{ maxHeight: "3rem", overflow: "hidden" }}>
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
      
    );
  } else {
    return <Card>Нет трайнинга</Card>;
  }
};
