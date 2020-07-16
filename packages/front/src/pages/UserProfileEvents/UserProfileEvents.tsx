import React from "react";
import { Table, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { UserProfileEventsQuery } from "./__generated__/UserProfileEventsQuery.graphql";
import { Event } from "../../utils/types";
import { AlertContext } from "../../hoc/Alert/AlertContext";
import { Modal } from "../../components/Modal/Modal";
import { UserProfileEventsMutation } from "./__generated__/UserProfileEventsMutation.graphql";

const query = graphql`
  query UserProfileEventsQuery {
    trainings {
      trainingId: id
      name
      start
      end
      listOfRequestsReviewsAndRecomends
    }
  }
`;

const mutation = graphql`
  mutation UserProfileEventsMutation($id: Float!) {
    deleteTrainingById(id: $id)
  }
`;

const UserProfileEvents: React.FC = () => {
  const { trainings } = useLazyLoadQuery<UserProfileEventsQuery>(
    query,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<UserProfileEventsMutation>(mutation);
  const [data, setData] = React.useState<Event[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [deletingTraining, setDeletingTraining] = React.useState<{
    trainingId: number;
    name: string;
  } | null>(null);

  const columns = [
    {
      title: "№",
      dataIndex: "trainingId",
    },
    {
      title: "Название",
      dataIndex: "name",
    },
    {
      title: "Даты",
      dataIndex: "start",
      render: (text: string, record: Event) => (
        <span>{`${text} - ${record.end}`}</span>
      ),
    },
    {
      title: "Заявки / Отзывы / Рекомендации",
      dataIndex: "listOfRequestsReviewsAndRecomends",
      render: (text: string, record: Event) => (
        <span>{record.listOfRequestsReviewsAndRecomends.join("/")}</span>
      ),
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: Event) => (
        <>
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link to={`/profile/trainings/edit/${record.trainingId}`}>
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large", cursor: "pointer" }}>
            <span
              onClick={() => {
                setDeletingTraining({
                  trainingId: record.trainingId,
                  name: record.name,
                });
                setIsModalVisible(true);
              }}
            >
              <DeleteOutlined />
            </span>
          </span>
        </>
      ),
    },
  ];

  const deleteCategory = (): void => {
    if (deletingTraining) {
      commit({
        variables: { id: deletingTraining.trainingId },
        onCompleted: () => {
          showAlert(`Событие ${deletingTraining.name} успешно удалено`);
          setData((prev) =>
            prev.filter(
              (training) => training.trainingId !== deletingTraining.trainingId
            )
          );
          setIsModalVisible(false);
        },
        onError: () =>
          showAlert(
            `При удалении события ${deletingTraining.name} произошла ошибка`,
            "error"
          ),
      });
    }
  };

  React.useEffect(() => {
    setData(trainings as Event[]);
  }, [trainings]);

  return (
    <section>
      <Modal
        open={isModalVisible}
        deletingObjectName={deletingTraining && deletingTraining.name}
        deletingObjectType="training"
        isLoading={isInFlight}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => deleteCategory()}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>События</h1>
        </div>
        <div>
          <Button>Выгрузить в XLS</Button>
          <Button type="primary">
            <Link to="/profile/trainings/create">Создать событие</Link>
          </Button>
        </div>
      </div>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileEvents;
