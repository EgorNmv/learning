import React from "react";
import { Card, Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  TargetAudiencesQueryResponse,
  TargetAudiencesQuery,
} from "./__generated__/TargetAudiencesQuery.graphql";
import { Modal } from "../../../../components/Modal/Modal";
import { TargetAudienceMutation } from "./__generated__/TargetAudienceMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import "./target-audience.css";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

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

type TargetAudience = TargetAudiencesQueryResponse["targetAudiences"][number];

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
  const [
    isVisibleSearchableInput,
    setIsVisibleSearchableInput,
  ] = React.useState<boolean>(false);

  const columns: ColumnsType<TargetAudience> = [
    {
      title: "№",
      dataIndex: "targetAudienceId",
      align: "center",
      width: "5rem",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="target-audiences-table__event-col">
          <span>Название</span>
          <SearchOutlined
            onClick={() =>
              setIsVisibleSearchableInput(!isVisibleSearchableInput)
            }
          />
        </div>
      ),
      dataIndex: "description",
      render: (text: string) => (
        <div className="td-cell__target-audience-name">{text}</div>
      ),
    },
    // {
    //   title: "Действия",
    //   dataIndex: "actions",
    //   align: "center",
    //   width: "10rem",
    //   render: (text: string, record: TargetAudience) => (
    //     <div className="td-cell__target-audience-actions">
    //       <span className="target-audiences-table__edit-btn">
    //         <Link
    //           to={`/profile/directories/targetaudiences/edit/${record.targetAudienceId}`}
    //         >
    //           <EditOutlined />
    //         </Link>
    //       </span>
    //       <span className="target-audiences-table__delete-btn">
    //         <DeleteOutlined
    //           onClick={() => {
    //             setDeletingOrganizer({
    //               targetAudienceId: record.targetAudienceId,
    //               name: record.description,
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
    if (deletingTargetAudience) {
      commit({
        variables: { id: deletingTargetAudience.targetAudienceId },
        onCompleted: () => {
          showAlert(
            `Целевая аудитория ${deletingTargetAudience.name} успешно удалена`
          );
          setData((prev) =>
            prev.filter(
              (targetAudience) =>
                targetAudience.targetAudienceId !==
                deletingTargetAudience.targetAudienceId
            )
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

  const onSearch = (searchValue: string) => {
    if (searchValue) {
      setData((prev) =>
        prev.filter(
          (targetAudience) =>
            targetAudience.description.indexOf(searchValue) !== -1
        )
      );
    } else {
      setData(targetAudiences as TargetAudience[]);
    }
  };

  React.useEffect(() => {
    setData(targetAudiences as TargetAudience[]);
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
      <div className="dic-target-audiences-page">
        <h2>Целевые аудитории</h2>
        <Button className="dic-target-audiences__create-btn" type="primary">
          <Link to="/profile/directories/targetaudiences/create">
            Создать целевую аудиторию
          </Link>
        </Button>
      </div>
      <Card className="dic-target-audiences-table__card">
        {isVisibleSearchableInput && (
          <Input.Search
            className="dic-target-audiences-table__card-input"
            enterButton="Искать"
            size="large"
            placeholder="Поиск целевых аудиторий по названию"
            onSearch={onSearch}
          />
        )}
        <Table
          className="dic-target-audiences-table"
          bordered
          columns={columns}
          dataSource={data}
          onHeaderRow={(column) => {
            return {
              className: "dic-target-audiences-table__header",
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
                          <div className="dic-target-audiences-table__footer-page">
                            {page}
                          </div>
                        );
                      case "prev":
                        return (
                          <div className="dic-target-audiences-table__footer-prev-btn">
                            ᐸ Пред.
                          </div>
                        );
                      case "next":
                        return (
                          <div className="dic-target-audiences-table__footer-next-btn">
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

export default TargetAudiences;
