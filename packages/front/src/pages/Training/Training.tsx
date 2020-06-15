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

const mutation = graphql`
  mutation TrainingMutation($data: InputRequest!) {
    createRequest(data: $data) {
      requestId: id
      date
    }
  }
`;
const query = graphql`
  query TrainingQuery($trainingId: Float!) {
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
      }
      start
      end
      site
      audience {
        description
      }
    }
  }
`;

const Training: React.FC = () => {
  const params = useParams<{ trainingId: string }>();
  const id: number = Number(params.trainingId);
  const [commit, isInFlight] = useMutation<TrainingMutation>(mutation);
  const { training } = useLazyLoadQuery<TrainingQuery>(query, {
    trainingId: id,
  });

  const clickHandler = () => {
    commit({
      variables: { data: { trainingId: id, userId: 2, date: "12.06.2020" } },
    });
  };

  return (
    <>
      <section>
        <Card loading={isInFlight}>
          <div style={{ display: "flex" }}>
            <div
              style={{ height: "15rem", width: "20rem", background: "grey" }}
            ></div>
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
              <div>
                <span style={{ fontWeight: "bold" }}>Сайт: </span>
                <span>{training?.site}</span>
              </div>
              <div>
                <Button type="primary" onClick={clickHandler}>
                  Подать заявку на участие
                </Button>
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
