import React from "react";
import { Card, Button } from "antd";
import { TrainingMaterials } from "../../components/TrainingMaterials/TrainingMaterials";
import { TrainingRecommendations } from "../../components/TrainingRecommendations/TrainingRecommendations";
import { TrainingReviews } from "../../components/TrainingReviews/TrainingReviews";
import { useParams } from "react-router-dom";
import { graphql } from "react-relay";
import { useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { TrainingMutation } from "./__generated__/TrainingMutation.graphql";
import { TrainingQuery } from "./__generated__/TrainingQuery.graphql";
import { formatDate } from "../../utils/utils";
import { UploadedPicture } from "../../components/UploadedPicture/UploadedPicture";
import { UserContext } from "../../hoc/UserContext/UserContext";
import "./training.css";

const mutation = graphql`
  mutation TrainingMutation($data: InputRequest!) {
    createRequest(data: $data) {
      requestId: id
      date
    }
  }
`;
const query = graphql`
  query TrainingQuery($trainingId: Float!, $userId: String!) {
    training(id: $trainingId) {
      trainingId: id
      label
      name
      description
      format {
        description
      }
      organizer {
        name
        address
        contactInfo
      }
      start
      end
      site
      audience {
        description
      }
    }
    isRequestExist(userId: $userId, trainingId: $trainingId)
  }
`;

const Training: React.FC = () => {
  const params = useParams<{ trainingId: string }>();
  const id: number = Number(params.trainingId);
  const user = React.useContext(UserContext);
  const [commit, isInFlight] = useMutation<TrainingMutation>(mutation);
  const { training, isRequestExist } = useLazyLoadQuery<TrainingQuery>(query, {
    trainingId: id,
    userId: user ? user.sub : "",
  });
  const [isClickedButton, setIsClickedButton] = React.useState<boolean>(false);

  const clickHandler = () => {
    user &&
      commit({
        variables: {
          data: {
            trainingId: id,
            userId: user.sub,
            date: formatDate(new Date()),
          },
        },
        onCompleted: () => {
          setIsClickedButton(true);
        },
      });
  };

  return (
    <>
      <section>
        <Card loading={isInFlight}>
          <div style={{ display: "flex" }}>
            <UploadedPicture
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "20rem",
                maxWidth: "20rem",
              }}
              filename={training?.label || null}
              imgType="training"
            />
            <div
              style={{
                paddingLeft: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <span style={{ fontWeight: "bold" }}>Организатор: </span>
                <span>{training?.organizer.name}</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Место проведения: </span>
                <span>{training?.organizer.address}</span>
              </div>
              {training?.organizer.contactInfo && (
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Контактная информация:{" "}
                  </span>
                  <span>{training?.organizer.contactInfo}</span>
                </div>
              )}
              <div>
                <span style={{ fontWeight: "bold" }}>Дата: </span>
                <span>{`${training?.start} - ${training?.end}`}</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Аудитория: </span>
                <span>{training?.audience.description}</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Формат обучения: </span>
                <span>{training?.format.description}</span>
              </div>
              {training?.site && (
                <div>
                  <span style={{ fontWeight: "bold" }}>Сайт: </span>
                  <span>{training?.site}</span>
                </div>
              )}
              <div>
                <Button
                  type="primary"
                  onClick={clickHandler}
                  disabled={isRequestExist || isClickedButton}
                >
                  Подать заявку на участие
                </Button>
              </div>
              <div className="training-description-section">
                {training?.description}
              </div>
            </div>
          </div>
        </Card>
      </section>
      <section>
        <TrainingMaterials />
      </section>
      <section>
        <TrainingRecommendations trainingId={id} />
      </section>
      <section>
        <TrainingReviews trainingId={id} />
      </section>
    </>
  );
};

export default Training;
