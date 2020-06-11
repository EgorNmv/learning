import React from "react";
import { TrainingCard } from "../../components/TrainingCard/TrainingCard";
import { Card, Button } from "antd";
import { TrainingMaterials } from "../../components/TrainingMaterials/TrainingMaterials";
import { TrainingRecommendations } from "../../components/TrainingRecommendations/TrainingRecommendations";
import { TrainingReviews } from "../../components/TrainingReviews/TrainingReviews";
import { useParams } from "react-router-dom";
import { graphql } from "react-relay";
import { useMutation } from "react-relay/hooks";
import { TrainingMutation } from "./__generated__/TrainingMutation.graphql";

const mutation = graphql`
  mutation TrainingMutation($data: InputRequest!) {
    createRequest(data: $data) {
      requestId: id
      date
    }
  }
`;

const Training: React.FC = () => {
  const params = useParams<{ trainingId: string }>();
  const id: number = Number(params.trainingId);
  const [commit, isInFlight] = useMutation<TrainingMutation>(mutation);
  const clickHandler = () => {
    commit({
      variables: { data: { trainingId: id, userId: 2, date: "12.06.2020" } },
    });
  };
  return (
    <>
      <section>
        <TrainingCard />
        <Card loading={isInFlight}>
          <Button type="primary" onClick={clickHandler}>
            Подать заявку на участие
          </Button>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            expedita, laboriosam, perspiciatis voluptatibus nulla voluptatem at
            molestias itaque cum dignissimos minus eos veritatis temporibus
            impedit repudiandae reprehenderit nihil velit officiis!
          </p>
        </Card>
      </section>
      <section>
        <TrainingMaterials />
      </section>
      <section>
        <TrainingRecommendations />
      </section>
      <section>
        <TrainingReviews />
      </section>
    </>
  );
};

export default Training;
