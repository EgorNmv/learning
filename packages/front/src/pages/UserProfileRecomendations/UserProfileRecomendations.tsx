import React from "react";
import { Table, Card } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import {
  UserProfileRecomendationsQuery,
  UserProfileRecomendationsQueryResponse,
} from "./__generated__/UserProfileRecomendationsQuery.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./user-profile-recomendations.css";

const query = graphql`
  query UserProfileRecomendationsQuery(
    $userId: String!
    $feedbackType: Float!
  ) {
    feedbacksByUserId(userId: $userId, feedbackType: $feedbackType) {
      feedbackId: id
      text
      training {
        trainingId: id
        name
        category {
          categoryId: id
        }
      }
      status
      date
    }
  }
`;

type Recommendation = UserProfileRecomendationsQueryResponse["feedbacksByUserId"][number];

const UserProfileRecomendations: React.FC = () => {
  const user = React.useContext(UserContext);
  const [data, setData] = React.useState<Recommendation[]>([]);
  const { feedbacksByUserId } = useLazyLoadQuery<
    UserProfileRecomendationsQuery
  >(query, {
    feedbackType: 1,
    userId: user ? user.sub : "",
  });
  const columns: ColumnsType<Recommendation> = [
    {
      title: "№",
      dataIndex: "feedbackId",
      align: "center",
      render: (text, record) => feedbacksByUserId.indexOf(record) + 1,
    },
    {
      title: (
        <div className="recomends-table__event-col">
          <span>Информация</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "training",
      render: (text, record) => (
        <div className="recomends-table__training-info">
          <p>
            <Link
              to={`/category/${record.training.category.categoryId}/training/${record.training.trainingId}`}
            >
              <span>{record.training.name}</span>
            </Link>
          </p>
          <p>{record.date}</p>
        </div>
      ),
    },
    {
      title: "Содержание",
      dataIndex: "text",
      width: 800,
    },
    {
      title: "Статус",
      dataIndex: "status",
      align: "center",
      render: (text, record) => {
        if (text === 0) {
          return <span className="recomend-status__yellow">В обработке</span>;
        } else if (text === 1) {
          return <span className="recomend-status__green">Принята</span>;
        } else {
          return <span className="recomend-status__red">Отклонена</span>;
        }
      },
    },
  ];

  React.useEffect(() => {
    setData(feedbacksByUserId as Recommendation[]);
  }, [feedbacksByUserId]);

  return (
    <section className="user-recomends">
      <Breadcrumbs />
      <span>
        <h2>Мои рекомендации</h2>
      </span>
      <Card className="recomends-table__card">
        <Table
          className="recomends-table"
          bordered
          columns={columns}
          dataSource={data}
          rowKey={"feedbackId"}
          onHeaderRow={(column) => {
            return {
              className: "recomends-table__header",
            };
          }}
          pagination={
            data.length > 10
              ? {
                  position: ["bottomCenter"],
                  itemRender: (page, type, originalElement) => {
                    switch (type) {
                      case "page":
                        return (
                          <div className="recomends-table__footer-page">
                            {page}
                          </div>
                        );
                      case "prev":
                        return (
                          <div className="recomends-table__footer-prev-btn">
                            ᐸ Пред.
                          </div>
                        );
                      case "next":
                        return (
                          <div className="recomends-table__footer-next-btn">
                            След. ᐳ
                          </div>
                        );
                      default:
                        return originalElement;
                    }
                  },
                }
              : false
          }
        />
      </Card>
    </section>
  );
};

export default UserProfileRecomendations;
