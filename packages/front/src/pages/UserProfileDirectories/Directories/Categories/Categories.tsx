import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import {
  CategoriesQuery,
  CategoriesQueryResponse,
} from "./__generated__/CategoriesQuery.graphql";
import { Writeable } from "../../../../utils/genericTypes";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Category } from "../../../../utils/types";
import { CategoriesMutation } from "./__generated__/CategoriesMutation.graphql";

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
  >(query, {});
  const [commit, isInFlight] = useMutation<CategoriesMutation>(mutation);
  const data: Category[] = categories as Writeable<Category[]>;

  const columns = [
    {
      title: "№",
      dataIndex: "categoryId",
    },
    {
      title: "Название",
      dataIndex: "description",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: Category) => (
        <>
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link
              to={`/profile/directories/categories/edit/${record.categoryId}`}
            >
              <EditOutlined />
            </Link>
          </span>
          <span style={{ fontSize: "xx-large" }}>
            <span
              onClick={() => commit({ variables: { id: record.categoryId } })}
            >
              <DeleteOutlined />
            </span>
          </span>
        </>
      ),
    },
  ];

  return (
    <section>
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
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default Categories;
