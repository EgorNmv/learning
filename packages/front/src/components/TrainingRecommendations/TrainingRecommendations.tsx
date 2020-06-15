import React from "react";
import { Carousel, Modal, Button, Input, Form } from "antd";
import "./TrainingRecomendations.css";
import { UserCard } from "../UserCard/UserCard";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { TrainingRecommendationsQuery } from "./__generated__/TrainingRecommendationsQuery.graphql";

const query = graphql`
  query TrainingRecommendationsQuery(
    $trainingId: Float!
    $feedbackType: Float!
  ) {
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

type TrainingRecommendationsProps = {
  trainingId: number;
};

export const TrainingRecommendations: React.FC<TrainingRecommendationsProps> = ({
  trainingId,
}) => {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const { feedbacksByTrainingId } = useLazyLoadQuery<
    TrainingRecommendationsQuery
  >(query, {
    trainingId,
    feedbackType: 1,
  });

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
        {feedbacksByTrainingId.map((recomendation) => (
          <UserCard feedback={recomendation} />
        ))}
      </Carousel>
    </>
  );
};
