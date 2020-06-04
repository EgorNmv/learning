import React from "react";
import { UserCard } from "../UserCard/UserCard";
import { Button, Form, Input, Modal, Rate } from "antd";

export const TrainingReviews: React.FC = () => {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  return (
    <>
      <div className="training-recomendation-title">
        <h2>Отзывы</h2>
        <Button type="link" onClick={() => setIsVisibleModal(true)}>
          Написать отзыв
        </Button>
        <Modal
          closable={false}
          visible={isVisibleModal}
          footer={[
            <Button key="back" onClick={() => setIsVisibleModal(false)}>
              Отмена
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isLoading}
              onClick={() => console.info("Send request")}
            >
              Отправить
            </Button>,
          ]}
        >
          <div />
          <Form layout={"vertical"} form={form} name="training-create">
            <Form.Item name="raiting" label="Рейтинг">
              <Rate />
            </Form.Item>
            <Form.Item
              name="review"
              label="Отзыв:"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={10} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </>
  );
};
