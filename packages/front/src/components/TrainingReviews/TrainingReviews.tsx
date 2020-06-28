import React from "react";
import { UserCard } from "../UserCard/UserCard";
import { Button, Form, Input, Modal, Rate } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { TrainingReviewsQuery } from "./__generated__/TrainingReviewsQuery.graphql";
import { TrainingReviewsMutation } from "./__generated__/TrainingReviewsMutation.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { formatDate } from "../../utils/utils";

const query = graphql`
  query TrainingReviewsQuery($trainingId: Float!, $feedbackType: Float!) {
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
  mutation TrainingReviewsMutation($data: InputFeedback!) {
    createFeedback(data: $data) {
      feedbackId: id
      userId
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
  const [commit, isInFlight] = useMutation<TrainingReviewsMutation>(mutation);
  const user = React.useContext(UserContext);

  const sendReview = () => {
    commit({
      variables: {
        data: {
          trainingId,
          userId: user.sub,
          date: formatDate(new Date()),
          type: 2,
          text: form.getFieldValue("review"),
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
              loading={isInFlight}
              onClick={sendReview}
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
