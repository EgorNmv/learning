import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const DownloadForm: React.FC<{
  filename: string | null;
  isDownloadBtnDisabled: boolean;
}> = ({ filename, isDownloadBtnDisabled }) => (
  <>
    <div>Ваш отчёт готов!</div>
    <Button
      className="report-modal__next-btn report-modal__all-trainings-btn"
      type="primary"
      disabled={!filename}
      loading={isDownloadBtnDisabled}
    >
      <a
        href={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/report/${filename}`}
      >
        Скачать
      </a>
    </Button>
  </>
);
