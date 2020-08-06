import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const DownloadForm: React.FC<{
  filename: string | null;
  isDownloadBtnDisabled: boolean;
}> = ({ filename, isDownloadBtnDisabled }) => (
  <>
    <span>Ваш отчёт готов!</span>
    <Button type="primary" disabled={!filename} loading={isDownloadBtnDisabled}>
      <a
        href={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/report/${filename}`}
      >
        Скачать
      </a>
    </Button>
  </>
);
