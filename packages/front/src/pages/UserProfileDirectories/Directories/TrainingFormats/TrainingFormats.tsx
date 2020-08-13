import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TrainingFormatsQuery } from "./__generated__/TrainingFormatsQuery.graphql";
import { TrainingFormat } from "../../../../utils/types";
import { Modal } from "../../../../components/Modal/Modal";
import { TrainingFormatsMutation } from "./__generated__/TrainingFormatsMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import "./training-formats.css";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";

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

  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Название",
      dataIndex: "description",
      render: (text: string) => (
        <div className="td-cell__training-format-name">{text}</div>
      ),
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: TrainingFormat) => (
        <div className="td-cell__training-format-actions">
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link
              to={`/profile/directories/trainingformats/edit/${record.trainingFormatId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large", cursor: "pointer" }}>
            <span
              onClick={() => {
                setTrainingFormat({
                  trainingFormatId: record.trainingFormatId,
                  name: record.description,
                });
                setIsModalVisible(true);
              }}
            >
              <DeleteOutlined />
            </span>
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
            prev
              .filter(
                (trainingFormat) =>
                  trainingFormat.trainingFormatId !==
                  deletingTrainingFormat.trainingFormatId
              )
              .map((trainingFormat, index) => ({
                ...trainingFormat,
                id: index + 1,
              }))
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
    setData(
      formats.map((trainingFormat, index) => ({
        ...trainingFormat,
        id: index + 1,
      })) as TrainingFormat[]
    );
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1rem",
        }}
      >
        <h1>Форматы обучения</h1>
        <Button type="primary">
          <Link to="/profile/directories/trainingformats/create">
            Создать формат обучения
          </Link>
        </Button>
      </div>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default TrainingFormats;
