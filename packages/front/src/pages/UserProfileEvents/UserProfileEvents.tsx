import React from "react";
import { Table, Card, Button, Input } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import {
  UserProfileEventsQuery,
  UserProfileEventsQueryResponse,
} from "./__generated__/UserProfileEventsQuery.graphql";
import { AlertContext } from "../../hoc/Alert/AlertContext";
import { Modal } from "../../components/Modal/Modal";
import { UserProfileEventsMutation } from "./__generated__/UserProfileEventsMutation.graphql";
import { ModalWithSteps } from "../../components/ModalWithSteps/ModalWithSteps";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./user-profile-events.css";
import { ColumnsType } from "antd/es/table";
import { UserProfileEventsSearchableInput } from "./UserProfileEventsSearchableInput/UserProfileEventsSearchableInput";

const query = graphql`
  query UserProfileEventsQuery {
    trainings {
      trainingId: id
      name
      start
      end
      isDateSet
      listOfRequestsReviewsAndRecomends
    }
  }
`;

const mutation = graphql`
  mutation UserProfileEventsMutation($id: Float!) {
    deleteTrainingById(id: $id)
  }
`;

type Training = UserProfileEventsQueryResponse["trainings"][number];

const UserProfileEvents: React.FC = () => {
  const { trainings } = useLazyLoadQuery<UserProfileEventsQuery>(
    query,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<UserProfileEventsMutation>(mutation);
  const [data, setData] = React.useState<Training[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [deletingTraining, setDeletingTraining] = React.useState<{
    trainingId: number;
    name: string;
  } | null>(null);
  const [isReportModalVisible, setIsReportModalVisible] = React.useState<
    boolean
  >(false);

  const columns: ColumnsType<Training> = [
    {
      title: "№",
      dataIndex: "trainingId",
      width: "5rem",
      align: "center",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="events-table__event-col">
          <span>Название</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "name",
      ellipsis: true,
      render: (text, record) => (
        <span className="events-table__event-col__data">{text}</span>
      ),
    },
    {
      title: "Даты",
      dataIndex: "start",
      align: "center",
      render: (text, record) => (
        <span>
          {record.isDateSet ? `${text} - ${record.end}` : "Дата не определена"}
        </span>
      ),
    },
    {
      title: "Заявки / Отзывы / Рекомендации",
      dataIndex: "listOfRequestsReviewsAndRecomends",
      align: "center",
      render: (text, record) => (
        <span>
          {record.listOfRequestsReviewsAndRecomends
            ? text.join("/")
            : "Не опеределено"}
        </span>
      ),
    },
    {
      title: "Действия",
      dataIndex: "end", // потому что нужен уникальный key(dataIndex в данном случае)
      align: "center",
      width: "10rem",
      render: (text, record) => (
        <>
          <span className="events-table__edit-btn">
            <Link to={`/profile/trainings/edit/${record.trainingId}`}>
              <EditOutlined />
            </Link>
          </span>
          {/* <span className="events-table__delete-btn">
            <DeleteOutlined
              onClick={() => {
                setDeletingTraining({
                  trainingId: record.trainingId,
                  name: record.name,
                });
                setIsModalVisible(true);
              }}
            />
          </span> */}
        </>
      ),
    },
  ];

  const deleteTraining = (): void => {
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
    setData(trainings as Training[]);
  }, [trainings]);

  return (
    <section>
      <Breadcrumbs />
      <Modal
        open={isModalVisible}
        deletingObjectName={deletingTraining && deletingTraining.name}
        deletingObjectType="training"
        isLoading={isInFlight}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => deleteTraining()}
      />
      <ModalWithSteps
        isOpen={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
      <div className="user-events-title">
        <div className="user-events-title__text">
          <h2>События</h2>
        </div>
        <div>
          <Button
            className="user-events__report-btn"
            onClick={() => setIsReportModalVisible(true)}
          >
            Выгрузить в XLS
          </Button>
          <Button className="user-events__create-btn" type="primary">
            <Link to="/profile/trainings/create">Создать событие</Link>
          </Button>
        </div>
      </div>
      <Card className="events-table__card">
        <UserProfileEventsSearchableInput onFetched={setData} />
        <Table<Training>
          className="events-table"
          bordered
          columns={columns}
          dataSource={data}
          onHeaderRow={(column) => {
            return {
              className: "events-table__header",
            };
          }}
          pagination={
            data.length > 10
              ? {
                  position: ["bottomCenter"],
                  itemRender: (page, type, originalElement) => {
                    switch (type) {
                      case "page":
                        return (
                          <div className="events-table__footer-page">
                            {page}
                          </div>
                        );
                      case "prev":
                        return (
                          <div className="events-table__footer-prev-btn">
                            ᐸ Пред.
                          </div>
                        );
                      case "next":
                        return (
                          <div className="events-table__footer-next-btn">
                            След. ᐳ
                          </div>
                        );
                      default:
                        return originalElement;
                    }
                  },
                }
              : false
          }
        />
      </Card>
    </section>
  );
};

export default UserProfileEvents;
