import React, { useContext } from "react";
import { Table, Card } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { UserProfileRequestsQuery } from "./__generated__/UserProfileRequestsQuery.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./user-profile-requests.css";
import { ColumnsType } from "antd/es/table";

const query = graphql`
  query UserProfileRequestsQuery($userId: String!) {
    requestsBySub(userId: $userId) {
      requestId: id
      userId
      date
      status
      training {
        name
      }
    }
  }
`;

type Request = {
  requestId: number;
  userId: string;
  date: string;
  status: string;
  training: {
    name: string;
  };
};

const UserProfileRequests: React.FC = () => {
  const [data, setData] = React.useState<Request[]>([]);
  const user = useContext(UserContext);
  const { requestsBySub } = useLazyLoadQuery<UserProfileRequestsQuery>(query, {
    userId: user ? user.sub : "",
  });
  const columns: ColumnsType<Request> = [
    {
      title: "№",
      dataIndex: "requestId",
    },
    {
      title: "Событие",
      dataIndex: "training",
      render: (text: string, record: Request) => (
        <span>{record.training.name}</span>
      ),
    },
    {
      title: "Дата подачи",
      dataIndex: "date",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (text: string, record: Request) => {
        if (text == "0") {
          return <span>В обработке</span>;
        } else if (text == "1") {
          return <span>Принята</span>;
        } else {
          return <span>Отклонена</span>;
        }
      },
    },
  ];

  React.useEffect(() => {
    requestsBySub && setData((requestsBySub as any) as Request[]);
  }, [requestsBySub]);

  return (
    <section className="user-requests">
      <Breadcrumbs />
      <h2>Мои заявки</h2>
      <Card>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          rowKey={"requestId"}
         
        />
      </Card>
    </section>
  );
};

export default UserProfileRequests;
