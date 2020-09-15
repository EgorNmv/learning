import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  TrainingFormatsQuery,
  TrainingFormatsQueryResponse,
} from "./__generated__/TrainingFormatsQuery.graphql";
import { Modal } from "../../../../components/Modal/Modal";
import { TrainingFormatsMutation } from "./__generated__/TrainingFormatsMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import "./training-formats.css";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

const query: GraphQLTaggedNode = graphql`
  query TrainingFormatsQuery {
    formats {
      trainingFormatId: id
      description
    }
  }
`;

const mutation = graphql`
  mutation TrainingFormatsMutation($id: Float!) {
    deleteFormatById(id: $id)
  }
`;

type TrainingFormat = TrainingFormatsQueryResponse["formats"][number];

const TrainingFormats: React.FC = () => {
  const { formats } = useLazyLoadQuery<TrainingFormatsQuery>(
    query,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<TrainingFormatsMutation>(mutation);
  const [data, setData] = React.useState<TrainingFormat[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [deletingTrainingFormat, setTrainingFormat] = React.useState<{
    trainingFormatId: number;
    name: string;
  } | null>(null);

  const columns: ColumnsType<TrainingFormat> = [
    {
      title: "№",
      dataIndex: "trainingFormatId",
      align: "center",
      width: "5rem",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="training-formats-table__event-col">
          <span>Название</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "description",
      render: (text) => (
        <div className="td-cell__training-format-name">{text}</div>
      ),
    },
    {
      title: "Действия",
      dataIndex: "actions",
      align: "center",
      width: "10rem",
      render: (text, record) => (
        <div className="td-cell__training-format-actions">
          <span className="training-formats-table__edit-btn">
            <Link
              to={`/profile/directories/trainingformats/edit/${record.trainingFormatId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span className="training-formats-table__delete-btn">
            <DeleteOutlined
              onClick={() => {
                setTrainingFormat({
                  trainingFormatId: record.trainingFormatId,
                  name: record.description,
                });
                setIsModalVisible(true);
              }}
            />
          </span>
        </div>
      ),
    },
  ];

  const deleteCategory = (): void => {
    if (deletingTrainingFormat) {
      commit({
        variables: { id: deletingTrainingFormat.trainingFormatId },
        onCompleted: () => {
          showAlert(
            `Формат обучения ${deletingTrainingFormat.name} успешно удалён`
          );
          setData((prev) =>
            prev.filter(
              (trainingFormat) =>
                trainingFormat.trainingFormatId !==
                deletingTrainingFormat.trainingFormatId
            )
          );
          setIsModalVisible(false);
        },
        onError: () =>
          showAlert(
            `При удалении формата обучения ${deletingTrainingFormat.name} произошла ошибка`,
            "error"
          ),
      });
    }
  };

  React.useEffect(() => {
    setData(formats as TrainingFormat[]);
  }, [formats]);

  return (
    <section>
      <Breadcrumbs />
      <Modal
        open={isModalVisible}
        deletingObjectName={
          deletingTrainingFormat && deletingTrainingFormat.name
        }
        deletingObjectType="format"
        isLoading={isInFlight}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => deleteCategory()}
      />
      <div className="dic-training-formats-page">
        <h2>Форматы обучения</h2>
        <Button className="dic-training-formats__create-btn" type="primary">
          <Link to="/profile/directories/trainingformats/create">
            Создать формат обучения
          </Link>
        </Button>
      </div>
      <Card className="dic-training-formats-table__card">
        <Table
          className="dic-training-formats-table"
          bordered
          columns={columns}
          dataSource={data}
          onHeaderRow={(column) => {
            return {
              className: "dic-training-formats-table__header",
            };
          }}
          pagination={{
            position: ["bottomCenter"],
            itemRender: (page, type, originalElement) => {
              switch (type) {
                case "page":
                  return (
                    <div className="dic-training-formats-table__footer-page">
                      {page}
                    </div>
                  );
                case "prev":
                  return (
                    <div className="dic-training-formats-table__footer-prev-btn">
                      ᐸ Пред.
                    </div>
                  );
                case "next":
                  return (
                    <div className="dic-training-formats-table__footer-next-btn">
                      След. ᐳ
                    </div>
                  );
                default:
                  return originalElement;
              }
            },
          }}
        />
      </Card>
    </section>
  );
};

export default TrainingFormats;
