import React, { useContext } from "react";
import { Table, Card } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { UserProfileRequestsQuery } from "./__generated__/UserProfileRequestsQuery.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./user-profile-requests.css";

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

const UserProfileRequests: React.FC = () => {
  const [data, setData] = React.useState<any>([]);
  const user = useContext(UserContext);
  const { requestsBySub } = useLazyLoadQuery<UserProfileRequestsQuery>(query, {
    userId: user ? user.sub : "",
  });
  const columns = [
    {
      title: "№",
      dataIndex: "requestId",
    },
    {
      title: "Событие",
      dataIndex: "training",
      render: (text: string, record: any) => (
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
      render: (text: string, record: any) => {
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
    requestsBySub && setData(requestsBySub);
  }, [requestsBySub]);

  return (
    <section className="user-requests">
      <Breadcrumbs />
      <h1>Мои заявки</h1>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileRequests;
