import React from "react";
import { Menu, Card } from "antd";
import { Options } from "./MenuItems/Options";
import { Requests } from "./MenuItems/Requests";
import { Reviews } from "./MenuItems/Reviews";
import { Recomendations } from "./MenuItems/Recomendations";
import { TrainingFormValues } from "../../utils/types";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { TrainingEditQuery } from "./__generated__/TrainingEditQuery.graphql";
import { useParams, useHistory } from "react-router-dom";
import { ClickParam } from "antd/lib/menu";
import {
  TrainingEditMutation,
  InputTraining,
} from "./__generated__/TrainingEditMutation.graphql";

const query = graphql`
  query TrainingEditQuery($trainingId: Float!) {
    training(id: $trainingId) {
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

const mutation = graphql`
  mutation TrainingEditMutation($trainingId: Float!, $data: InputTraining!) {
    updateTrainingById(id: $trainingId, data: $data) {
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

const TrainingEdit: React.FC = () => {
  const params = useParams<{ id: string }>();
  let history = useHistory();
  const id = Number(params.id);
  const { training } = useLazyLoadQuery<TrainingEditQuery>(query, {
    trainingId: id,
  });
  const [commit, isInFlight] = useMutation<TrainingEditMutation>(mutation);
  const [currentMenu, setCurrentMenu] = React.useState<string>("options");
  const [dataForTrainingForm, setDataForTrainingForm] = React.useState<
    TrainingFormValues
  >({
    category: 1,
    description: training?.description,
    endDate: training?.end,
    name: training?.name,
    organizer: training?.organizer.organizerId,
    startDate: training?.start,
    targetAudience: training?.audience.audienceId,
    trainingFormat: training?.format.formatId,
  });

  const handleClick = (e: ClickParam) => {
    setCurrentMenu(e.key);
  };

  const sendForm = (data: InputTraining) => {
    commit({
      variables: { trainingId: id, data },
      onCompleted: () => {
        history.goBack();
      },
    });
  };

  const menu: { [key: string]: React.ReactElement } = {
    options: (
      <Options
        dataForTrainingForm={dataForTrainingForm}
        onFinishTrainingForm={sendForm}
      />
    ),
    requests: <Requests />,
    reviews: <Reviews />,
    recomendations: <Recomendations />,
  };

  React.useEffect(() => {
    setDataForTrainingForm({
      category: 1,
      description: training?.description,
      endDate: training?.end,
      name: training?.name,
      organizer: training?.organizer.organizerId,
      startDate: training?.start,
      targetAudience: training?.audience.audienceId,
      trainingFormat: training?.format.formatId,
    });
  }, [training]);

  return (
    <section>
      <span>
        <h1>Редактирование события</h1>
      </span>
      <Card loading={isInFlight}>
        <Menu
          onClick={handleClick}
          selectedKeys={[currentMenu]}
          mode="horizontal"
        >
          <Menu.Item key="options">Параметры</Menu.Item>
          <Menu.Item key="requests">Заявки</Menu.Item>
          <Menu.Item key="reviews">Отзывы</Menu.Item>
          <Menu.Item key="recomendations">Рекомендации</Menu.Item>
        </Menu>
        {menu[currentMenu]}
      </Card>
    </section>
  );
};

export default TrainingEdit;
