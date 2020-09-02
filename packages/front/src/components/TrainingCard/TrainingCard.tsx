import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./training-card.css";
import { UploadedPicture } from "../UploadedPicture/UploadedPicture";
import { CameraTwoTone } from "@ant-design/icons";

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
      description: string;
    };
    format?: {
      description: string;
    };
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
      category,
      format,
    } = training;

    const ImgWithCategoryAndFormat: React.FC = () => {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "206px",
            maxWidth: "214px",
            borderRadius: "15px 0px 0px 15px",
            display: "flex",
          }}
        >
          {training.label ? (
            <>
              <div style={{ position: "absolute", top: "15px", left: "15px" }}>
                <div
                  style={{
                    marginBottom: "15px",
                    height: "30px",
                    width: "138px",
                    background: "#00BBEE",
                    color: "#FFFFFF",
                    font: "normal normal normal 12px/14px Arial",
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  {category?.description}
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    height: "30px",
                    width: "138px",
                    background: "#FF5A5A",
                    color: "#FFFFFF",
                    font: "normal normal normal 12px/14px Arial",
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  {format?.description}
                </div>
              </div>
              <UploadedPicture
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "206px",
                  maxWidth: "214px",
                  borderRadius: "15px 0px 0px 15px",
                }}
                filename={training.label}
                imgType="training"
              />
            </>
          ) : (
            <>
              <div style={{ position: "absolute", top: "15px", left: "15px" }}>
                <div
                  style={{
                    marginBottom: "15px",
                    height: "30px",
                    width: "138px",
                    background: "#00BBEE",
                    color: "#FFFFFF",
                    font: "normal normal normal 12px/14px Arial",
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  {category?.description}
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    height: "30px",
                    width: "138px",
                    background: "#FF5A5A",
                    color: "#FFFFFF",
                    font: "normal normal normal 12px/14px Arial",
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  {format?.description}
                </div>
              </div>
              <CameraTwoTone
                twoToneColor="#7766CC"
                className="training-card_icon"
              />
            </>
          )}
        </div>
      );
    };

    return (
      <div
        className="training-card"
        style={placeInCalendar ? { width: "100%" } : {}}
      >
        <ImgWithCategoryAndFormat />
        <div className="training-info">
          <div className="training-name">
            <Link to={`/category/1/training/${trainingId}`}>
              <span>{name}</span>
            </Link>
          </div>
          <div className="training-desc">
            <span>{description.substring(0, 100)}</span>
          </div>
          <div style={{ margin: "15px 0" }}>
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
