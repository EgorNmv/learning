import React from "react";
import { Table, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { UserProfileEventsQuery } from "./__generated__/UserProfileEventsQuery.graphql";
import { Writeable } from "../../utils/genericTypes";
import { Event } from "../../utils/types";

const query = graphql`
  query UserProfileEventsQuery {
    trainings {
      trainingId: id
      name
      start
      end
    }
  }
`;

const UserProfileEvents: React.FC = () => {
  const { trainings } = useLazyLoadQuery<UserProfileEventsQuery>(query, {});
  const columns = [
    {
      title: "№",
      dataIndex: "trainingId",
    },
    {
      title: "Название",
      dataIndex: "name",
    },
    {
      title: "Даты",
      dataIndex: "start",
      render: (text: string, record: Event) => (
        <span>{`${text} - ${record.end}`}</span>
      ),
    },
    {
      title: "Заявки / Отзывы / Рекомендации",
      dataIndex: "trainingStatus",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      render: (text: string, record: Event) => (
        <>
          <span style={{ fontSize: "xx-large", paddingRight: "2rem" }}>
            <Link to={`/profile/trainings/edit/${record.trainingId}`}>
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
  const data = trainings as Writeable<Event[]>;

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>События</h1>
        </div>
        <div>
          <Button>Выгрузить в XLS</Button>
          <Button type="primary">
            <Link to="/profile/trainings/create">Создать событие</Link>
          </Button>
        </div>
      </div>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileEvents;
