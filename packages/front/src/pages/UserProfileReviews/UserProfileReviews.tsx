import React from "react";
import { Table, Card, Rate } from "antd";
import { graphql } from "react-relay";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { useLazyLoadQuery } from "react-relay/hooks";
import { UserProfileReviewsQuery } from "./__generated__/UserProfileReviewsQuery.graphql";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./user-profile-reviews.css";

const query = graphql`
  query UserProfileReviewsQuery($userId: String!, $feedbackType: Float!) {
    feedbacksByUserId(userId: $userId, feedbackType: $feedbackType) {
      feedbackId: id
      text
      training {
        trainindId: id
        name
        category {
          categoryId: id
        }
      }
      status
      rate
      date
    }
  }
`;

const UserProfileReviews: React.FC = () => {
  const user = React.useContext(UserContext);
  const [data, setData] = React.useState<any>([]);
  const { feedbacksByUserId } = useLazyLoadQuery<UserProfileReviewsQuery>(
    query,
    {
      feedbackType: 2,
      userId: user ? user.sub : "",
    }
  );
  const columns = [
    {
      title: "№",
      dataIndex: "feedbackId",
    },
    {
      title: "Информация",
      dataIndex: "training",
      render: (text: string, record: any) => (
        <>
          <p>{record.training.name}</p>
          <p>{record.date}</p>
          <p>
            <Rate disabled value={record.rate} />
          </p>
        </>
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
        <h1>Мои отзывы</h1>
      </span>
      <Card>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </section>
  );
};

export default UserProfileReviews;
