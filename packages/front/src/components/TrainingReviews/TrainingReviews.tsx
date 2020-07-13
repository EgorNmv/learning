import React from "react";
import { UserCard } from "../UserCard/UserCard";
import { Button, Form, Input, Modal, Rate, Empty } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { TrainingReviewsQuery } from "./__generated__/TrainingReviewsQuery.graphql";
import { TrainingReviewsMutation } from "./__generated__/TrainingReviewsMutation.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { formatDate } from "../../utils/utils";
import { AlertContext } from "../../hoc/Alert/AlertContext";

const query = graphql`
  query TrainingReviewsQuery($trainingId: Float!, $feedbackType: Float!) {
    acceptedFeedbacksByTrainingId(
      feedbackType: $feedbackType
      trainingId: $trainingId
    ) {
      feedbackId: id
      userId
      text
      date
      rate
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
  const [form] = Form.useForm();
  const { acceptedFeedbacksByTrainingId } = useLazyLoadQuery<
    TrainingReviewsQuery
  >(query, {
    trainingId,
    feedbackType: 2,
  });
  const [commit, isInFlight] = useMutation<TrainingReviewsMutation>(mutation);
  const user = React.useContext(UserContext);
  const { showAlert } = React.useContext(AlertContext);

  const sendReview = () => {
    user &&
      commit({
        variables: {
          data: {
            trainingId,
            userId: user.sub,
            date: formatDate(new Date()),
            type: 2,
            text: form.getFieldValue("review"),
            rate: Number(form.getFieldValue("rate")),
          },
        },
        onCompleted: () => {
          setIsVisibleModal(false);
          showAlert("Ваш отзыв отправлен в обработку");
        },
        onError: () => {
          setIsVisibleModal(false);
          showAlert("Ошибка при добавлении отзыва", "error");
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
            <Form.Item name="rate" label="Рейтинг">
              <Rate defaultValue={3} />
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
      {acceptedFeedbacksByTrainingId.map((review) => (
        <UserCard feedback={review} />
      ))}
      {acceptedFeedbacksByTrainingId.length <= 0 && (
        <div style={{ margin: "auto" }}>
          <Empty />
        </div>
      )}
    </>
  );
};
