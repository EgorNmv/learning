import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./training-card.css";
import { UploadedPicture } from "../UploadedPicture/UploadedPicture";

type TrainingCardProps = {
  training: {
    trainingId: number;
    name: string;
    label: string | null;
    organizer: { name: string };
    start: string | null;
    end: string | null;
    description: string;
    isDateSet: boolean;
  };
  placeInCalendar?: boolean;
};

export const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  placeInCalendar = false,
}) => {
  if (training) {
    const {
      trainingId,
      name,
      organizer,
      start,
      end,
      description,
      isDateSet,
    } = training;

    return (
      <div
        className="training-card"
        style={placeInCalendar ? { width: "100%" } : {}}
      >
        {training.label ? (
          <UploadedPicture
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
        ) : (
          <div
            style={{
              width: "100px",
              height: "100%",
              background: "gray",
            }}
          />
        )}
        <div className="training-info">
          <div className="training-name">
            <Link to={`/category/1/training/${trainingId}`}>
              <span>{name}</span>
            </Link>
          </div>
          <div className="training-desc">
            <p>{description}</p>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Организатор: </span>
            <span>{organizer?.name}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Дата: </span>
            {isDateSet ? (
              <span>
                {start} - {end}
              </span>
            ) : (
              <span>Дата не определена</span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
