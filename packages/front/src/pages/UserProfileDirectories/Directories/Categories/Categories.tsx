import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import {
  CategoriesQuery,
  CategoriesQueryResponse,
} from "./__generated__/CategoriesQuery.graphql";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CategoriesMutation } from "./__generated__/CategoriesMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { Modal } from "../../../../components/Modal/Modal";
import "./categories.css";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

const query: GraphQLTaggedNode = graphql`
  query CategoriesQuery {
    categories {
      categoryId: id
      description
    }
  }
`;
const mutation = graphql`
  mutation CategoriesMutation($id: Float!) {
    deleteCategoryById(id: $id)
  }
`;

type Category = CategoriesQueryResponse["categories"][number];

const Categories: React.FC = () => {
  const { categories }: CategoriesQueryResponse = useLazyLoadQuery<
    CategoriesQuery
  >(query, {}, { fetchPolicy: "store-and-network" });
  const [commit, isInFlight] = useMutation<CategoriesMutation>(mutation);
  const [data, setData] = React.useState<Category[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [deletingCategory, setDeletingCategory] = React.useState<{
    categoryId: number;
    name: string;
  } | null>(null);

  const columns: ColumnsType<Category> = [
    {
      title: "№",
      dataIndex: "categoryId",
      align: "center",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="categories-table__event-col">
          <span>Название</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "description",
      render: (text, record) => (
        <div className="td-cell__category-name">{text}</div>
      ),
    },
    {
      title: "Действия",
      align: "center",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="td-cell__category-actions">
          <span className="categories-table__edit-btn">
            <Link
              to={`/profile/directories/categories/edit/${record.categoryId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span className="categories-table__delete-btn">
            <DeleteOutlined
              onClick={() => {
                setDeletingCategory({
                  categoryId: record.categoryId,
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
    if (deletingCategory) {
      commit({
        variables: { id: deletingCategory.categoryId },
        onCompleted: () => {
          showAlert(`Категория ${deletingCategory.name} успешно удалена`);
          setData((prev) =>
            prev.filter(
              (category) => category.categoryId !== deletingCategory.categoryId
            )
          );
          setIsModalVisible(false);
        },
        onError: () =>
          showAlert(
            `При удалении категории ${deletingCategory.name} произошла ошибка`,
            "error"
          ),
        updater: (proxyStore) => {
          if (deletingCategory) {
            for (let i = 0; i < categories.length; i++) {
              const category = proxyStore.get(`client:root:categories:${i}`);

              if (category?.getValue("id") === deletingCategory.categoryId) {
                proxyStore.delete(`client:root:categories:${i}`);
              }
            }
          }
        },
      });
    }
  };

  React.useEffect(() => {
    categories && setData(categories.filter(Boolean) as Category[]);
  }, [categories]);

  return (
    <section>
      <Breadcrumbs />
      <Modal
        open={isModalVisible}
        deletingObjectName={deletingCategory && deletingCategory.name}
        deletingObjectType="category"
        isLoading={isInFlight}
        onCancel={() => setIsModalVisible(false)}
        onOk={deleteCategory}
      />
      <div className="dic-categories-page">
        <h2>Категории</h2>
        <Button className="dic-categories__create-btn" type="primary">
          <Link to="/profile/directories/categories/create">
            Создать категорию
          </Link>
        </Button>
      </div>
      <Card className="dic-categories-table__card">
        <Table
          className="dic-categories-table"
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={(record): string =>
            `${record.categoryId}${record.description}`
          }
          onHeaderRow={(column) => {
            return {
              className: "dic-categories-table__header",
            };
          }}
        />
      </Card>
    </section>
  );
};

export default Categories;
