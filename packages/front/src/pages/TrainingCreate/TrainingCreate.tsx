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
import { AlertContext } from "../../hoc/Alert/AlertContext";

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
  const history = useHistory();
  const { showAlert } = React.useContext(AlertContext);

  const sendForm = (data: InputTraining) => {
    commit({
      variables: { data },
      onCompleted: () => {
        showAlert("Событие успешно создано");
        history.goBack();
      },
      onError: () => {
        showAlert("Ошибка при создании события", "error");
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
