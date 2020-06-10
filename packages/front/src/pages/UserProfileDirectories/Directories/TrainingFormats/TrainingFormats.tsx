import React from "react";
import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { graphql, GraphQLTaggedNode } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { Writeable } from "../../../../utils/genericTypes";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TrainingFormatsQuery } from "./__generated__/TrainingFormatsQuery.graphql";

type TrainingFormat = {
  trainingFormatId: number;
  description: string;
};

const query: GraphQLTaggedNode = graphql`
  query TrainingFormatsQuery {
    formats {
      trainingFormatId: id
      description
    }
  }
`;

const columns = [
  {
    title: "№",
    dataIndex: "trainingFormatId",
  },
  {
    title: "Название",
    dataIndex: "description",
  },
  {
    title: "Действия",
    dataIndex: "actions",
    render: (text: string, record: TrainingFormat) => (
      <>
        <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
          <Link
            to={`/profile/directories/trainingformats/edit/${record.trainingFormatId}`}
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

const TrainingFormats: React.FC = () => {
  const { formats } = useLazyLoadQuery<TrainingFormatsQuery>(
    query,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const data: TrainingFormat[] = formats as Writeable<TrainingFormat[]>;

  return (
    <section>
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
