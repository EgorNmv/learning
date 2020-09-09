import React from "react";
import { Carousel, Modal, Button, Input, Form, Empty } from "antd";
import "./training-recomendations.css";
import { UserCard } from "../UserCard/UserCard";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { TrainingRecommendationsQuery } from "./__generated__/TrainingRecommendationsQuery.graphql";
import { TrainingRecommendationsMutation } from "./__generated__/TrainingRecommendationsMutation.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { formatDate } from "../../utils/utils";
import { AlertContext } from "../../hoc/Alert/AlertContext";
import RecomendSvg from "../../static/img/recomendation.svg";

const query = graphql`
  query TrainingRecommendationsQuery(
    $trainingId: Float!
    $feedbackType: Float!
  ) {
    acceptedFeedbacksByTrainingId(
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
  const { showAlert } = React.useContext(AlertContext);
  const { acceptedFeedbacksByTrainingId } = useLazyLoadQuery<
    TrainingRecommendationsQuery
  >(
    query,
    {
      trainingId,
      feedbackType: 1,
    },
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<TrainingRecommendationsMutation>(
    mutation
  );
  const user = React.useContext(UserContext);

  const sendRecommendation = () => {
    user &&
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
          form.resetFields();
          showAlert("Ваша рекомендация отправлена в обработку");
        },
        onError: () => {
          setIsVisibleModal(false);
          showAlert("Ошибка при добавлении рекомендации", "error");
        },
      });
  };

  return (
    <>
      <div className="training-recomendation-title">
        <div className="training-recomendation-title__recomend-count">
          <h2>Рекомендации</h2>
          <span>{acceptedFeedbacksByTrainingId.length} рекомендации</span>
        </div>
        <Button type="link" onClick={() => setIsVisibleModal(true)}>
          Написать рекомендацию
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
              <div className="recomend-modal__main-part__img__text__write-recomend">
                Написать рекомендацию
              </div>
              <img src={RecomendSvg} alt="рекомендация" />
            </div>
            <div className="recomend-modal__main-part">
              <div className="recomend-modal__main-part__form">
                <Form layout={"vertical"} form={form} name="training-create">
                  <Form.Item
                    name="recomendation"
                    label="Рекомендация:"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={15} />
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
                  onClick={sendRecommendation}
                  className="recomend-modal__footer__ok-btn"
                >
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {acceptedFeedbacksByTrainingId.length === 0 ? (
        <div style={{ margin: "auto" }}>
          <Empty />
        </div>
      ) : (
        <Carousel
          dots={{ className: "custom-dot-for-recomends-slider" }}
          arrows={true}
          infinite
          // lazyLoad="ondemand"
        >
          {acceptedFeedbacksByTrainingId.map((recomendation) => (
            <UserCard feedback={recomendation} />
          ))}
        </Carousel>
      )}
    </>
  );
};
