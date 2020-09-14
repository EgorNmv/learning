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
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./training-create.css";

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
      isDateSet
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
      <section className="training-create-page">
        <Breadcrumbs />
        <h2>Создание события</h2>
        <Card loading={isInFlight} className="training-create-page__card">
          <TrainingForm onFinish={sendForm} />
        </Card>
      </section>
    </>
  );
};

export default TrainingCreate;
