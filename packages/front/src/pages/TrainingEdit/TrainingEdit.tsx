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
import { AlertContext } from "../../hoc/Alert/AlertContext";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./training-edit.css";

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
      isDateSet
      audience {
        audienceId: id
        description
      }
      category {
        categoryId: id
        description
      }
      site
      numberOfParticipants
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
      isDateSet
      audience {
        audienceId: id
        description
      }
      site
      numberOfParticipants
    }
  }
`;

const TrainingEdit: React.FC = () => {
  const history = useHistory();
  const trainingId = Number(useParams<{ trainingId: string }>().trainingId);
  const { showAlert } = React.useContext(AlertContext);
  const { training } = useLazyLoadQuery<TrainingEditQuery>(query, {
    trainingId,
  });
  const [commit, isInFlight] = useMutation<TrainingEditMutation>(mutation);
  const [currentMenu, setCurrentMenu] = React.useState<string>("options");
  const [
    dataForTrainingForm,
    setDataForTrainingForm,
  ] = React.useState<TrainingFormValues | null>(null);

  const handleClick = (e: ClickParam) => {
    setCurrentMenu(e.key);
  };

  const sendForm = (data: InputTraining) => {
    commit({
      variables: { trainingId, data },
      onCompleted: () => {
        showAlert("Событие успешно отредактировано");
        history.goBack();
      },
      onError: () => {
        showAlert("Ошибка при редактировании события", "error");
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
    if (training) {
      setDataForTrainingForm({
        category: training?.category.categoryId,
        label: training?.label,
        description: training?.description,
        endDate: training?.end,
        name: training?.name,
        organizer: training?.organizer.organizerId,
        startDate: training?.start,
        targetAudience: training?.audience.audienceId,
        trainingFormat: training?.format.formatId,
        countOfSeats: training.numberOfParticipants,
        site: training.site,
        isDateSet: training.isDateSet,
      });
    }
  }, [training]);

  return (
    <section className="training-edit-page">
      <Breadcrumbs />
      <h2>Редактирование события</h2>
      <Card loading={isInFlight} className="training-edit-page__card">
        <Menu
          onClick={handleClick}
          selectedKeys={[currentMenu]}
          mode="horizontal"
          className="training-edit-page__menu"
        >
          <Menu.Item key="options" className="training-edit-page__menu-item">
            Параметры
          </Menu.Item>
          <Menu.Item key="requests" className="training-edit-page__menu-item">
            Заявки
          </Menu.Item>
          <Menu.Item key="reviews" className="training-edit-page__menu-item">
            Отзывы
          </Menu.Item>
          <Menu.Item
            key="recomendations"
            className="training-edit-page__menu-item"
          >
            Рекомендации
          </Menu.Item>
        </Menu>
        {menu[currentMenu]}
      </Card>
    </section>
  );
};

export default TrainingEdit;
