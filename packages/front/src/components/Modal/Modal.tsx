import React from "react";
import { Modal as AntModal, Button } from "antd";
import "./modal.css";
import trash from "./trash_default.svg";
import { loadOptions } from "@babel/core";

type DeletingObjectTypes =
  | "category"
  | "organizer"
  | "audience"
  | "format"
  | "training";

type ModalProps = {
  open: boolean;
  deletingObjectName: string | null;
  deletingObjectType: DeletingObjectTypes;
  onOk: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const deletingObjectsMap: {
  [key in DeletingObjectTypes | string]: {
    [key in "title" | "content"]: string;
  };
} = {
  category: { title: "категории", content: "категорию" },
  organizer: { title: "организатора", content: "организатора" },
  audience: { title: "целевой аудитории", content: "целевую аудиторию" },
  format: { title: "формат обучения", content: "формат обучния" },
  training: { title: "события", content: "событие" },
};

export const Modal: React.FC<ModalProps> = ({
  open,
  deletingObjectName,
  deletingObjectType,
  onOk,
  onCancel,
  isLoading = false,
}) => (
  <AntModal
    confirmLoading={isLoading}
    closable={false}
    maskClosable={true}
    visible={open}
    onOk={onOk}
    onCancel={onCancel}
    footer={
      <div className="app-modal__footer">
        <Button type="ghost" onClick={onCancel}>
          Отмена
        </Button>
        <Button
          type="primary"
          className="app-modal__footer-delete-btn"
          onClick={onOk}
        >
          Удалить
        </Button>
      </div>
    }
  >
    <div className="app-modal__red-line"></div>
    <div className="app-modal__content">
      <div>
        <img src={trash} alt="Delete item" />
      </div>
      <div>
        <p className="app-modal__content-title">
          Удаление {deletingObjectsMap[`${deletingObjectType}`].title}
        </p>
        <p>
          Вы уверены, что хотите удалить{" "}
          {deletingObjectsMap[`${deletingObjectType}`].content} "
          {deletingObjectName && deletingObjectName}"?
          <br />
          Удаление записи приведёт к необратимой потере данных связанных
          записей.
        </p>
      </div>
    </div>
  </AntModal>
);
