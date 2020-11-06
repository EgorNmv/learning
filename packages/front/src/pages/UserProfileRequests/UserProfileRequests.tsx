import React, { useContext } from "react";
import { Table, Card, Input } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import {
  UserProfileRequestsQuery,
  UserProfileRequestsQueryResponse,
} from "./__generated__/UserProfileRequestsQuery.graphql";
import { UserContext } from "../../hoc/UserContext/UserContext";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import "./user-profile-requests.css";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const query = graphql`
  query UserProfileRequestsQuery($userId: String!) {
    requestsBySub(userId: $userId) {
      requestId: id
      userId
      date
      status
      training {
        trainingId: id
        name
        organizer {
          name
        }
        start
        end
        category {
          categoryId: id
        }
      }
    }
  }
`;

type Request = UserProfileRequestsQueryResponse["requestsBySub"][number];

const UserProfileRequests: React.FC = () => {
  const user = useContext(UserContext);
  const { requestsBySub } = useLazyLoadQuery<UserProfileRequestsQuery>(query, {
    userId: user ? user.sub : "",
  });
  const [data, setData] = React.useState<Request[]>(requestsBySub as Request[]);
  const [
    isVisibleSearchableInput,
    setIsVisibleSearchableInput,
  ] = React.useState(false);
  const columns: ColumnsType<Request> = [
    {
      title: "№",
      dataIndex: "requestId",
      align: "center",
      render: (text, record) => requestsBySub.indexOf(record) + 1,
    },
    {
      title: (
        <div className="requests-table__event-col">
          <span>Событие</span>
          <SearchOutlined
            onClick={() =>
              setIsVisibleSearchableInput(!isVisibleSearchableInput)
            }
          />
        </div>
      ),
      dataIndex: "training",
      render: (text, record) => (
        <div className="requests-table__training-info">
          <p>
            <Link
              to={`/category/${record.training.category.categoryId}/training/${record.training.trainingId}`}
            >
              {record.training.name}
            </Link>
          </p>
          <p>
            <span>Организатор: </span>
            {record.training.organizer.name}
          </p>
          <p>
            <span>Дата: </span>
            {record.training.start && record.training.end
              ? `${record.training.start} - ${record.training.end}`
              : "Не определена"}
          </p>
        </div>
      ),
    },
    {
      title: "Дата подачи",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Статус",
      align: "center",
      dataIndex: "status",
      render: (text, record) => {
        if (text === 0) {
          return <span className="request-status__yellow">В обработке</span>;
        } else if (text === 1) {
          return <span className="request-status__green">Принята</span>;
        } else {
          return <span className="request-status__red">Отклонена</span>;
        }
      },
    },
  ];

  const onSearch = (searchValue: string) => {
    if (searchValue) {
      setData((prev) =>
        prev.filter(
          (request) => request.training.name.indexOf(searchValue) !== -1
        )
      );
    } else {
      setData(requestsBySub as Request[]);
    }
  };

  return (
    <section className="user-requests">
      <Breadcrumbs />
      <h2>Мои заявки</h2>
      <Card className="requests-table__card">
        {isVisibleSearchableInput && (
          <Input.Search
            className="requests-table__card-input"
            enterButton="Искать"
            size="large"
            placeholder="Поиск заявок по названию событий"
            onSearch={onSearch}
          />
        )}
        <Table
          className="requests-table"
          bordered
          columns={columns}
          dataSource={data as Request[]}
          rowKey={"requestId"}
          onHeaderRow={(column) => {
            return {
              className: "requests-table__header",
            };
          }}
          pagination={
            requestsBySub.length > 10
              ? {
                  position: ["bottomCenter"],
                  itemRender: (page, type, originalElement) => {
                    switch (type) {
                      case "page":
                        return (
                          <div className="requests-table__footer-page">
                            {page}
                          </div>
                        );
                      case "prev":
                        return (
                          <div className="requests-table__footer-prev-btn">
                            ᐸ Пред.
                          </div>
                        );
                      case "next":
                        return (
                          <div className="requests-table__footer-next-btn">
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

export default UserProfileRequests;
