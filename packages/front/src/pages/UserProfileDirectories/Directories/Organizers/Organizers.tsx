import React from "react";
import { Button, Card, Table } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import {
  OrganizersQuery,
  OrganizersQueryResponse,
} from "./__generated__/OrganizersQuery.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { OrganizersMutation } from "./__generated__/OrganizersMutation.graphql";
import { Modal } from "../../../../components/Modal/Modal";
import "./organizers.css";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

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

type Organizer = OrganizersQueryResponse["organizers"][number];

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

  const columns: ColumnsType<Organizer> = [
    {
      title: "№",
      dataIndex: "organizerId",
      align: "center",
      width: "5rem",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="organizers-table__event-col">
          <span>Название</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "name",
      render: (text, record) => (
        <div className="td-cell__organizer-name">
          <p>{text}</p>
          <p>{record.address}</p>
          <p>
            <a>{record.site}</a>
          </p>
        </div>
      ),
    },
    {
      title: "Тип",
      dataIndex: "type",
      align: "center",
      width: "15rem",
      render: (text, record) => (record.type === 1 ? "Внешний" : "Внутренний"),
    },
    // {
    //   title: "Действия",
    //   dataIndex: "actions",
    //   align: "center",
    //   width: "10rem",
    //   render: (text, record) => (
    //     <div className="td-cell__organizer-actions">
    //       <span className="organizers-table__edit-btn">
    //         <Link
    //           to={`/profile/directories/organizers/edit/${record.organizerId}`}
    //         >
    //           <EditOutlined />
    //         </Link>
    //       </span>
    //       <span className="organizers-table__delete-btn">
    //         <DeleteOutlined
    //           onClick={() => {
    //             setDeletingOrganizer({
    //               organizerId: record.organizerId,
    //               name: record.name,
    //             });
    //             setIsModalVisible(true);
    //           }}
    //         />
    //       </span>
    //     </div>
    //   ),
    // },
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
      <Breadcrumbs />
      <Modal
        open={isModalVisible}
        deletingObjectName={deletingOrganizer && deletingOrganizer.name}
        deletingObjectType="organizer"
        isLoading={isInFlight}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => deleteCategory()}
      />
      <div className="dic-organizers-page">
        <h2>Организаторы</h2>
        <Button className="dic-organizers__create-btn" type="primary">
          <Link to="/profile/directories/organizers/create">
            Создать организатора
          </Link>
        </Button>
      </div>
      <Card className="dic-organizers-table__card">
        <Table
          className="dic-organizers-table"
          bordered
          columns={columns}
          dataSource={data}
          onHeaderRow={(column) => {
            return {
              className: "dic-organizers-table__header",
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
                          <div className="dic-organizers-table__footer-page">
                            {page}
                          </div>
                        );
                      case "prev":
                        return (
                          <div className="dic-organizers-table__footer-prev-btn">
                            ᐸ Пред.
                          </div>
                        );
                      case "next":
                        return (
                          <div className="dic-organizers-table__footer-next-btn">
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

export default Organizers;
