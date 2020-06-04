import React from "react";
import { Carousel, Modal, Button, Input, Form } from "antd";
import "./TrainingRecomendations.css";
import { UserCard } from "../UserCard/UserCard";
import { Store } from "antd/lib/form/interface";

export const TrainingRecommendations: React.FC = () => {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  return (
    <>
      <div className="training-recomendation-title">
        <h2>Рекомендации</h2>
        <Button type="link" onClick={() => setIsVisibleModal(true)}>
          Написать рекомендацию
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
            <Form.Item
              name="recomendation"
              label="Рекомендация:"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={10} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Carousel>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </Carousel>
    </>
  );
};
