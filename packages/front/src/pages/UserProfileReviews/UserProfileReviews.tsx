import React from "react";
import { Table, Card, Rate } from "antd";
import { graphql } from "react-relay";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { useLazyLoadQuery } from "react-relay/hooks";
import {
  UserProfileReviewsQuery,
  UserProfileReviewsQueryResponse,
} from "./__generated__/UserProfileReviewsQuery.graphql";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import "./user-profile-reviews.css";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const query = graphql`
  query UserProfileReviewsQuery($userId: String!, $feedbackType: Float!) {
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
      rate
      date
    }
  }
`;

type Review = UserProfileReviewsQueryResponse["feedbacksByUserId"][number];

const UserProfileReviews: React.FC = () => {
  const user = React.useContext(UserContext);
  const { feedbacksByUserId } = useLazyLoadQuery<UserProfileReviewsQuery>(
    query,
    {
      feedbackType: 2,
      userId: user ? user.sub : "",
    }
  );
  const columns: ColumnsType<Review> = [
    {
      title: "№",
      dataIndex: "feedbackId",
      align: "center",
      render: (text, record) => feedbacksByUserId.indexOf(record) + 1,
    },
    {
      title: (
        <div className="reviews-table__event-col">
          <span>Информация</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "training",
      render: (text, record) => (
        <div className="reviews-table__training-info">
          <p>
            <Link
              to={`/category/${record.training.category.categoryId}/training/${record.training.trainingId}`}
            >
              {record.training.name}
            </Link>
          </p>
          <p>{record.date}</p>
          <p>
            <Rate disabled value={record.rate ? record.rate : 0} />
          </p>
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
          return <span className="review-status__yellow">В обработке</span>;
        } else if (text === 1) {
          return <span className="review-status__green">Принят</span>;
        } else {
          return <span className="review-status__red">Отклонен</span>;
        }
      },
    },
  ];

  return (
    <section className="user-reviews">
      <Breadcrumbs />
      <span>
        <h2>Мои отзывы</h2>
      </span>
      <Card className="reviews-table__card">
        <Table
          className="reviews-table"
          bordered
          columns={columns}
          dataSource={feedbacksByUserId as Review[]}
          rowKey={"feedbackId"}
          onHeaderRow={(column) => {
            return {
              className: "reviews-table__header",
            };
          }}
          pagination={
            feedbacksByUserId.length > 10
              ? {
                  position: ["bottomCenter"],
                  itemRender: (page, type, originalElement) => {
                    switch (type) {
                      case "page":
                        return (
                          <div className="reviews-table__footer-page">
                            {page}
                          </div>
                        );
                      case "prev":
                        return (
                          <div className="reviews-table__footer-prev-btn">
                            ᐸ Пред.
                          </div>
                        );
                      case "next":
                        return (
                          <div className="reviews-table__footer-next-btn">
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

export default UserProfileReviews;
