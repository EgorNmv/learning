import React from "react";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { Card, Table } from "antd";
import {
  UsersQuery,
  UsersQueryResponse,
} from "./__generated__/UsersQuery.graphql";

type User = {
  userId: number;
  fullname: string;
};

const query = graphql`
  query UsersQuery {
    users {
      userId: id
      fullname
    }
  }
`;

const Users: React.FC = () => {
  const { users }: UsersQueryResponse = useLazyLoadQuery<UsersQuery>(query, {});

  const columns = [
    {
      title: "№",
      dataIndex: "userId",
    },
    {
      title: "ФИО",
      dataIndex: "fullname",
    },
    {
      title: "Роль",
      dataIndex: "role",
    },
    {
      title: "Доступ",
      dataIndex: "access",
    },
  ];
  const data: User[] = users as any;

  return (
    <section>
      <span>
        <h1>Пользователи</h1>
      </span>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default Users;
