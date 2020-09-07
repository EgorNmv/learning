import React from "react";

type UploadedPictureProps = {
  imgType: "user" | "training" | "category";
  style?: { [key: string]: string };
  className?: string;
  filename: string | null;
  size?: "small" | "medium";
};

export const UploadedPicture: React.FC<UploadedPictureProps> = ({
  filename,
  imgType,
  className,
  style,
  size = "medium",
}) => {
  if (filename) {
    return (
      <img
        className={className}
        style={{ ...style }}
        src={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/${imgType}/${filename}`}
        alt={`${imgType} изображение`}
      />
    );
  } else {
    return (
      <div
        style={
          className || style
            ? { ...style }
            : { width: 300, height: 300, background: "grey" }
        }
        className={className}
      />
    );
  }
};
