import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { Writeable } from "../../../../utils/genericTypes";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  TargetAudiencesQueryResponse,
  TargetAudiencesQuery,
} from "./__generated__/TargetAudiencesQuery.graphql";

type TargetAudience = {
  targetAudienceId: number;
  description: string;
};

const query: GraphQLTaggedNode = graphql`
  query TargetAudiencesQuery {
    targetAudiences {
      targetAudienceId: id
      description
    }
  }
`;

const columns = [
  {
    title: "№",
    dataIndex: "targetAudienceId",
  },
  {
    title: "Название",
    dataIndex: "description",
  },
  {
    title: "Действия",
    dataIndex: "actions",
    render: (text: string, record: TargetAudience) => (
      <>
        <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
          <Link
            to={`/profile/directories/targetaudiences/edit/${record.targetAudienceId}`}
          >
            <EditOutlined />
          </Link>
        </span>
        <span style={{ fontSize: "xx-large" }}>
          <Link to="/">
            <DeleteOutlined />
          </Link>
        </span>
      </>
    ),
  },
];

const TargetAudiences: React.FC = () => {
  const { targetAudiences }: TargetAudiencesQueryResponse = useLazyLoadQuery<
    TargetAudiencesQuery
  >(query, {}, { fetchPolicy: "store-and-network" });
  const data: TargetAudience[] = targetAudiences as Writeable<TargetAudience[]>;

  return (
    <section>
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
