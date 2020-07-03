import React from "react";
import { Card } from "antd";
import { TrainingForm } from "../../components/TrainingForm/TrainingForm";
import { graphql } from "react-relay";
import { useMutation } from "react-relay/hooks";
import {
  TrainingCreateMutation,
  InputTraining,
} from "./__generated__/TrainingCreateMutation.graphql";
import { useHistory } from "react-router-dom";

const mutation = graphql`
  mutation TrainingCreateMutation($data: InputTraining!) {
    createTraining(data: $data) {
      trainingId: id
      label
      name
      description
      format {
        formatId: id
        description
      }
      organizer {
        organizerId: id
        name
        address
        site
        type
      }
      start
      end
      audience {
        audienceId: id
        description
      }
      site
    }
  }
`;

const TrainingCreate: React.FC = () => {
  const [commit, isInFlight] = useMutation<TrainingCreateMutation>(mutation);
  let history = useHistory();

  const sendForm = (data: InputTraining) => {
    commit({
      variables: { data },
      onCompleted: () => {
        history.goBack();
      },
    });
  };

  return (
    <>
      <h1>Создание события</h1>
      <section>
        <Card loading={isInFlight}>
          <TrainingForm onFinish={sendForm} />
        </Card>
      </section>
    </>
  );
};

export default TrainingCreate;
