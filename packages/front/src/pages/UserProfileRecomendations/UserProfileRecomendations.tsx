import React from "react";
import { Table, Card } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { UserProfileRecomendationsQuery } from "./__generated__/UserProfileRecomendationsQuery.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";

const query = graphql`
  query UserProfileRecomendationsQuery(
    $userId: String!
    $feedbackType: Float!
  ) {
    feedbacksByUserId(userId: $userId, feedbackType: $feedbackType) {
      feedbackId: id
      text
      training {
        name
      }
      status
    }
  }
`;

const UserProfileRecomendations: React.FC = () => {
  const user = React.useContext(UserContext);
  const [data, setData] = React.useState<any>([]);
  const { feedbacksByUserId } = useLazyLoadQuery<
    UserProfileRecomendationsQuery
  >(query, {
    feedbackType: 1,
    userId: user ? user.sub : "",
  });
  const columns = [
    {
      title: "№",
      dataIndex: "feedbackId",
    },
    {
      title: "Информация",
      dataIndex: "training",
      render: (text: string, record: any) => (
        <span>{record.training.name}</span>
      ),
    },
    {
      title: "Содержание",
      dataIndex: "text",
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
    feedbacksByUserId && setData(feedbacksByUserId);
  }, [feedbacksByUserId]);

  return (
    <section>
      <Breadcrumbs />
      <span>
        <h1>Мои рекомендации</h1>
      </span>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileRecomendations;
