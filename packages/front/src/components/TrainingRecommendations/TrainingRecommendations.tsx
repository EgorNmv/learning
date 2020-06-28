import React from "react";
import { Carousel, Modal, Button, Input, Form } from "antd";
import "./TrainingRecomendations.css";
import { UserCard } from "../UserCard/UserCard";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { TrainingRecommendationsQuery } from "./__generated__/TrainingRecommendationsQuery.graphql";
import { TrainingRecommendationsMutation } from "./__generated__/TrainingRecommendationsMutation.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { formatDate } from "../../utils/utils";

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
      userId
      text
      date
    }
  }
`;

const mutation = graphql`
  mutation TrainingRecommendationsMutation($data: InputFeedback!) {
    createFeedback(data: $data) {
      feedbackId: id
      userId
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
  const [form] = Form.useForm();
  const { feedbacksByTrainingId } = useLazyLoadQuery<
    TrainingRecommendationsQuery
  >(query, {
    trainingId,
    feedbackType: 1,
  });
  const [commit, isInFlight] = useMutation<TrainingRecommendationsMutation>(
    mutation
  );
  const user = React.useContext(UserContext);

  const sendRecommendation = () => {
    commit({
      variables: {
        data: {
          trainingId,
          userId: user.sub,
          date: formatDate(new Date()),
          type: 1,
          text: form.getFieldValue("recomendation"),
        },
      },
      onCompleted: () => {
        setIsVisibleModal(false);
      },
    });
  };

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
              loading={isInFlight}
              onClick={sendRecommendation}
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
