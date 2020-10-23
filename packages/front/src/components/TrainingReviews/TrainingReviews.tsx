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
import ReviewSvg from "../../static/img/review.svg";
import "./training-reviews.css";

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
  >(
    query,
    {
      trainingId,
      feedbackType: 2,
    },
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<TrainingReviewsMutation>(mutation);
  const user = React.useContext(UserContext);
  const { showAlert } = React.useContext(AlertContext);

  const sendReview = () => {
    const text: string = form.getFieldValue("review").trim();
    const rate: number = form.getFieldValue("rate")
      ? Number(form.getFieldValue("rate"))
      : 0;

    if (user && text) {
      commit({
        variables: {
          data: {
            trainingId,
            userId: user.sub,
            date: formatDate(new Date()),
            type: 2,
            rate,
            text,
          },
        },
        onCompleted: () => {
          setIsVisibleModal(false);
          form.resetFields();
          showAlert("Ваш отзыв отправлен в обработку");
        },
        onError: () => {
          setIsVisibleModal(false);
          showAlert("Ошибка при добавлении отзыва", "error");
        },
      });
    }
  };

  return (
    <>
      <div className="training-recomendation-title">
        <div className="training-recomendation-title__recomend-count">
          <h2>Отзывы</h2>
          <span>{acceptedFeedbacksByTrainingId.length} отзывов</span>
        </div>
        <Button type="link" onClick={() => setIsVisibleModal(true)}>
          Написать отзыв
        </Button>
        <Modal
          closable={true}
          closeIcon={
            <span
              className="recomend-modal__all__close-ico"
              onClick={() => setIsVisibleModal(false)}
            >
              Закрыть
            </span>
          }
          visible={isVisibleModal}
          footer={null}
          className="recomend-modal__all"
        >
          <div className="recomend-modal">
            <div className="recomend-modal__main-part__img">
              <div className="recomend-modal__main-part__img__text">
                Оставить отзыв
              </div>
              <img src={ReviewSvg} alt="отзывй" />
            </div>
            <div className="recomend-modal__main-part">
              <div className="recomend-modal__main-part__form">
                <Form layout={"vertical"} form={form} name="training-create">
                  <Form.Item
                    name="rate"
                    label="Рейтинг:"
                    initialValue={3}
                    rules={[{ required: true }]}
                  >
                    <Rate />
                  </Form.Item>
                  <Form.Item
                    name="review"
                    label="Отзыв:"
                    rules={[{ required: true }]}
                    initialValue=""
                  >
                    <Input.TextArea rows={12} />
                  </Form.Item>
                </Form>
              </div>
              <div className="recomend-modal__footer">
                <Button
                  key="back"
                  onClick={() => setIsVisibleModal(false)}
                  className="recomend-modal__footer__cancel-btn"
                >
                  Отмена
                </Button>
                <Button
                  key="submit"
                  type="primary"
                  loading={isInFlight}
                  onClick={sendReview}
                  className="recomend-modal__footer__ok-btn"
                >
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {acceptedFeedbacksByTrainingId.map((review) => (
        <UserCard feedback={review} className="user-card__review-card" />
      ))}
      {acceptedFeedbacksByTrainingId.length <= 0 && (
        <div style={{ margin: "auto" }}>
          <Empty />
        </div>
      )}
    </>
  );
};
