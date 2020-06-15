import React from "react";
import { UserCard } from "../UserCard/UserCard";
import { Button, Form, Input, Modal, Rate } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { TrainingReviewsQuery } from "./__generated__/TrainingReviewsQuery.graphql";

const query = graphql`
  query TrainingReviewsQuery($trainingId: Float!, $feedbackType: Float!) {
    feedbacksByTrainingId(
      feedbackType: $feedbackType
      trainingId: $trainingId
    ) {
      feedbackId: id
      user {
        fullname
        photo
      }
      text
      date
    }
  }
`;

type TrainingReviewsProps = {
  trainingId: number;
};

export const TrainingReviews: React.FC<TrainingReviewsProps> = ({
  trainingId,
}) => {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const { feedbacksByTrainingId } = useLazyLoadQuery<TrainingReviewsQuery>(
    query,
    {
      trainingId,
      feedbackType: 2,
    }
  );

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
      {feedbacksByTrainingId.map((review) => (
        <UserCard feedback={review} />
      ))}
    </>
  );
};
