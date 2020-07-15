import React from "react";
import { Button, Card, Table } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { OrganizersQuery } from "./__generated__/OrganizersQuery.graphql";
import { Organizer } from "../../../../utils/types";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { OrganizersMutation } from "./__generated__/OrganizersMutation.graphql";
import { Modal } from "../../../../components/Modal/Modal";

const query = graphql`
  query OrganizersQuery {
    organizers {
      organizerId: id
      name
      address
      site
      type
    }
  }
`;

const mutation = graphql`
  mutation OrganizersMutation($id: Float!) {
    deleteOrganizerById(id: $id)
  }
`;

const Organizers: React.FC = () => {
  const { organizers } = useLazyLoadQuery<OrganizersQuery>(
    query,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<OrganizersMutation>(mutation);
  const [data, setData] = React.useState<Organizer[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [deletingOrganizer, setDeletingOrganizer] = React.useState<{
    organizerId: number;
    name: string;
  } | null>(null);

  const columns = [
    {
      title: "№",
      dataIndex: "organizerId",
    },
    {
      title: "Название",
      dataIndex: "name",
      render: (text: string, record: Organizer) => (
        <>
          <p>{text}</p>
          <p>{record.address}</p>
          <p>{record.site}</p>
        </>
      ),
    },
    {
      title: "Тип",
      dataIndex: "type",
      render: (text: string, record: Organizer) =>
        record.type === 1 ? "Внешний" : "Внутренний",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: Organizer) => (
        <>
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link
              to={`/profile/directories/organizers/edit/${record.organizerId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large", cursor: "pointer" }}>
            <span
              onClick={() => {
                setDeletingOrganizer({
                  organizerId: record.organizerId,
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
    if (deletingOrganizer) {
      commit({
        variables: { id: deletingOrganizer.organizerId },
        onCompleted: () => {
          showAlert(`Организатор ${deletingOrganizer.name} успешно удалён`);
          setData((prev) =>
            prev.filter(
              (organizer) =>
                organizer.organizerId !== deletingOrganizer.organizerId
            )
          );
          setIsModalVisible(false);
        },
        onError: () =>
          showAlert(
            `При удалении организатора ${deletingOrganizer.name} произошла ошибка`,
            "error"
          ),
      });
    }
  };

  React.useEffect(() => {
    setData(organizers as Organizer[]);
  }, [organizers]);

  return (
    <section>
      <Modal
        open={isModalVisible}
        deletingObjectName={deletingOrganizer && deletingOrganizer.name}
        deletingObjectType="organizer"
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
        <h1>Организаторы</h1>
        <Button type="primary">
          <Link to="/profile/directories/organizers/create">
            Создать организатора
          </Link>
        </Button>
      </div>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default Organizers;
