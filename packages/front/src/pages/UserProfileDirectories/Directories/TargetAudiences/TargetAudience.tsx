import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  TargetAudiencesQueryResponse,
  TargetAudiencesQuery,
} from "./__generated__/TargetAudiencesQuery.graphql";
import { TargetAudience } from "../../../../utils/types";
import { Modal } from "../../../../components/Modal/Modal";
import { TargetAudienceMutation } from "./__generated__/TargetAudienceMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import "./target-audience.css";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";

const query: GraphQLTaggedNode = graphql`
  query TargetAudiencesQuery {
    targetAudiences {
      targetAudienceId: id
      description
    }
  }
`;

const mutation = graphql`
  mutation TargetAudienceMutation($id: Float!) {
    deleteTargetAudienceById(id: $id)
  }
`;

const TargetAudiences: React.FC = () => {
  const { targetAudiences }: TargetAudiencesQueryResponse = useLazyLoadQuery<
    TargetAudiencesQuery
  >(query, {}, { fetchPolicy: "store-and-network" });
  const [commit, isInFlight] = useMutation<TargetAudienceMutation>(mutation);
  const [data, setData] = React.useState<TargetAudience[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [deletingTargetAudience, setDeletingOrganizer] = React.useState<{
    targetAudienceId: number;
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
        <div className="td-cell__target-audience-name">{text}</div>
      ),
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: TargetAudience) => (
        <div className="td-cell__target-audience-actions">
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link
              to={`/profile/directories/targetaudiences/edit/${record.targetAudienceId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large", cursor: "pointer" }}>
            <span
              onClick={() => {
                setDeletingOrganizer({
                  targetAudienceId: record.targetAudienceId,
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
    if (deletingTargetAudience) {
      commit({
        variables: { id: deletingTargetAudience.targetAudienceId },
        onCompleted: () => {
          showAlert(
            `Целевая аудитория ${deletingTargetAudience.name} успешно удалена`
          );
          setData((prev) =>
            prev
              .filter(
                (targetAudience) =>
                  targetAudience.targetAudienceId !==
                  deletingTargetAudience.targetAudienceId
              )
              .map((targetAudience, index) => ({
                ...targetAudience,
                id: index + 1,
              }))
          );
          setIsModalVisible(false);
        },
        onError: () =>
          showAlert(
            `При удалении целевой аудитории ${deletingTargetAudience.name} произошла ошибка`,
            "error"
          ),
      });
    }
  };

  React.useEffect(() => {
    setData(
      targetAudiences.map((targetAudience, index) => ({
        ...targetAudience,
        id: index + 1,
      })) as TargetAudience[]
    );
  }, [targetAudiences]);

  return (
    <section>
      <Breadcrumbs />
      <Modal
        open={isModalVisible}
        deletingObjectName={
          deletingTargetAudience && deletingTargetAudience.name
        }
        deletingObjectType="audience"
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
        <h1>Целевые аудитории</h1>
        <Button type="primary">
          <Link to="/profile/directories/targetaudiences/create">
            Создать целевую аудиторию
          </Link>
        </Button>
      </div>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default TargetAudiences;
