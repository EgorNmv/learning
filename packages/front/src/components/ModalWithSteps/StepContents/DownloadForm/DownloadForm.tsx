import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const DownloadForm: React.FC<{ filename?: string }> = ({ filename }) => (
  <>
    <span>Ваш отчёт готов!</span>
    <Button type="primary">
      <Link to="filename">Скачать</Link>
    </Button>
  </>
);
