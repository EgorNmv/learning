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
import { Category } from "../../../../utils/types";
import { CategoriesMutation } from "./__generated__/CategoriesMutation.graphql";
import { AlertContext } from "../../../../hoc/Alert/AlertContext";
import { Modal } from "../../../../components/Modal/Modal";
import "./categories.css";

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
    id: number | null;
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
        <div className="td-cell__category-name">{text}</div>
      ),
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: Category) => (
        <div className="td-cell__category-actions">
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link
              to={`/profile/directories/categories/edit/${record.categoryId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large", cursor: "pointer" }}>
            <span
              onClick={() => {
                setDeletingCategory({
                  categoryId: record.categoryId,
                  name: record.description,
                  id: record.id || null,
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
    if (deletingCategory) {
      commit({
        variables: { id: deletingCategory.categoryId },
        onCompleted: () => {
          showAlert(`Категория ${deletingCategory.name} успешно удалена`);
          setData((prev) =>
            prev
              .filter(
                (category) =>
                  category.categoryId !== deletingCategory.categoryId
              )
              .filter(Boolean)
              .map((category, index) => ({ ...category, id: index + 1 }))
          );
          setIsModalVisible(false);
        },
        onError: () =>
          showAlert(
            `При удалении категории ${deletingCategory.name} произошла ошибка`,
            "error"
          ),
        updater: (proxyStore) => {
          if (deletingCategory && deletingCategory.id) {
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
    setData(
      categories
        .map((category, index) => {
          if (!category) {
            return null;
          }
          return {
            ...category,
            id: index + 1,
          };
        })
        .filter(Boolean) as Category[]
    );
  }, [categories]);

  return (
    <section>
      <Modal
        open={isModalVisible}
        deletingObjectName={deletingCategory && deletingCategory.name}
        deletingObjectType="category"
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
        <h1>Категории</h1>
        <Button type="primary">
          <Link to="/profile/directories/categories/create">
            Создать категорию
          </Link>
        </Button>
      </div>
      <Card>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          rowKey={(record: Category): string =>
            `${record.categoryId}${record.description}`
          }
        />
      </Card>
    </section>
  );
};

export default Categories;
