import React from "react";
import { Button, Card, Table } from "antd";
import { Link } from "react-router-dom";
import { Writeable } from "../../../../utils/genericTypes";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { OrganizersQuery } from "./__generated__/OrganizersQuery.graphql";
import { Organizer } from "../../../../utils/types";

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
        <span style={{ fontSize: "xx-large" }}>
          <Link to="/">
            <DeleteOutlined />
          </Link>
        </span>
      </>
    ),
  },
];

const Organizers: React.FC = () => {
  const { organizers } = useLazyLoadQuery<OrganizersQuery>(
    query,
    {},
    { fetchPolicy: "store-and-network" }
  );
  const data: Organizer[] = organizers as Writeable<Organizer[]>;
  return (
    <section>
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
            Создать орагнизатора
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
