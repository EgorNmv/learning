import React from "react";
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
    category?: {
      categoryId: number;
      description: string;
    };
    format?: {
      description: string;
    };
  };
  placeInCalendar?: boolean;
};

export const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  if (training) {
    const {
      trainingId,
      name,
      organizer,
      start,
      end,
      description,
      isDateSet,
      category,
      format,
    } = training;

    const ImgWithCategoryAndFormat: React.FC = () => (
      <div className="training-card__img">
        <div className="training-card__img__plaques">
          <div>{category?.description}</div>
          <div>{format?.description}</div>
        </div>
        {training.label ? (
          <UploadedPicture
            className="training-card__img__label"
            filename={training.label}
            imgType="training"
          />
        ) : null}
      </div>
    );

    return (
      <div className="training-card">
        <ImgWithCategoryAndFormat />
        <div className="training-info">
          <div className="training-name">
            <Link
              to={`/category/${category?.categoryId}/training/${trainingId}`}
            >
              <span>{name}</span>
            </Link>
          </div>
          <div className="training-desc">
            <span>{description.substring(0, 100)}</span>
          </div>
          <div className="training-organizer">
            <span>Организатор: </span>
            <span>{organizer?.name}</span>
          </div>
          <div className="training-dates">
            <span>Дата: </span>
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
