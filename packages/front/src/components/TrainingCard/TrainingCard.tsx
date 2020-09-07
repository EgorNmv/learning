import React from "react";
import { Link } from "react-router-dom";
import "./training-card.css";
import { UploadedPicture } from "../UploadedPicture/UploadedPicture";
import { Rate } from "antd";
import RecomendSvg from "../../static/ico/recomend.svg";
import Icon from "@ant-design/icons";

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
    listOfRequestsReviewsAndRecomends?: number[] | null;
    averageRating?: number | null;
  };
  placeInCalendar?: boolean;
  placeInCategoryPage?: boolean;
};

export const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  placeInCalendar = false,
  placeInCategoryPage = false,
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
      category,
      format,
    } = training;

    if (placeInCalendar) {
      return (
        <div className="training-card-in-calendar">
          {training.label ? (
            <UploadedPicture
              className="training-card-in-calendar__img__label"
              filename={training.label}
              imgType="training"
            />
          ) : (
            <div className="training-card-in-calendar__img__label no-label" />
          )}
          <div className="training-card-in-calendar-info">
            <div className="training-card-in-calendar-name">
              <Link
                to={`/category/${category?.categoryId}/training/${trainingId}`}
              >
                <span>{name}</span>
              </Link>
            </div>
            <div className="training-card-in-calendar-desc">
              <span>{description.substring(0, 40)}</span>
            </div>
          </div>
        </div>
      );
    } else {
      const ImgWithCategoryAndFormat: React.FC = () => (
        <div className="training-card__img">
          <div className="training-card__img__plaques">
            {category?.description && <div>{category?.description}</div>}
            {format?.description && <div>{format?.description}</div>}
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
          {placeInCategoryPage && training.listOfRequestsReviewsAndRecomends && (
            <div className="training-rate">
              <div className="training-rate__recomendations">
                <img
                  src={RecomendSvg}
                  alt="Количество рекомендаций: "
                  className="training-rate__recomendations_icon"
                />
                <span>{training.listOfRequestsReviewsAndRecomends[2]}</span>
              </div>
              <div className="training-rate__reviews">
                <div>
                  <Rate
                    value={
                      training.averageRating
                        ? Math.round(training.averageRating)
                        : 0
                    }
                  />
                  <span style={{ marginLeft: 15 }}>
                    {training.averageRating || 0}
                  </span>
                </div>
                <div className="training-rate__reviews-count">
                  {`(${training.listOfRequestsReviewsAndRecomends[1]} оценок)`}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  } else {
    return null;
  }
};
