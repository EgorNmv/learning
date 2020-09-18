import React from "react";
import { Table, Button, Rate } from "antd";
import { InputFeedback } from "../TrainingReviews/__generated__/TrainingReviewsMutation.graphql";
import { formatDate } from "../../utils/utils";
import { useParams } from "react-router-dom";
import "./training-edit-reviews-and-recomends-table.css";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

type TrainingEditReviewsAndRecomendsTableProps = {
  feedbacks: {
    feedbackId: number;
    text: string;
    userId: string;
    status: number;
    rate: number;
  }[];
  onChangeFeedbackStatus: (feedbackId: number, data: InputFeedback) => void;
  isRecomendations: boolean;
};

export const TrainingEditReviewsAndRecomendsTable: React.FC<TrainingEditReviewsAndRecomendsTableProps> = ({
  feedbacks,
  onChangeFeedbackStatus,
  isRecomendations,
}) => {
  const trainingId = Number(useParams<{ trainingId: string }>().trainingId);
  const [objWithFullnames, setObjWithFullnames] = React.useState<any>({});
  const [data, setData] = React.useState<any[]>(feedbacks);
  const columns: ColumnsType = [
    {
      title: "№",
      dataIndex: "feedbackId",
      align: "center",
      width: "5rem",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="reviews-and-recomends-table__event-col">
          <span>Информация</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "userId",
      render: (text: string, record: any) => {
        return (
          <div className="reviews-and-recomends-table__user-info">
            <p>
              {objWithFullnames[`${text}`]
                ? objWithFullnames[`${text}`]
                : "Загрузка..."}
            </p>
            <p>{record.date}</p>
            {record.rate && (
              <p>
                <Rate disabled value={record.rate} />
              </p>
            )}
          </div>
        );
      },
    },
    {
      title: "Содержание",
      dataIndex: "text",
      width: 800,
      className: "reviews-and-recomends-table__text",
    },
    {
      title: "Статус",
      dataIndex: "status",
      align: "center",
      width: "20rem",
      render: (text: string, record: any) => {
        if (text == "0") {
          return (
            <>
              <span>
                <Button
                  className="reviews-and-recomends-table__actions-ok"
                  type="link"
                  onClick={() => {
                    onChangeFeedbackStatus(record.feedbackId, {
                      date: formatDate(new Date()),
                      text: record.text,
                      trainingId,
                      type: isRecomendations ? 1 : 2,
                      userId: record.userId,
                      status: 1,
                      rate: isRecomendations ? null : record.rate,
                    });
                    setData((prev) =>
                      prev.map((feedback) =>
                        feedback.feedbackId === record.feedbackId
                          ? { ...feedback, disabledBtn: true }
                          : { ...feedback }
                      )
                    );
                  }}
                  disabled={record.disabledBtn}
                >
                  Принять
                </Button>
              </span>
              <span>
                <Button
                  className="reviews-and-recomends-table__actions-cancel"
                  type="link"
                  onClick={() => {
                    onChangeFeedbackStatus(record.feedbackId, {
                      date: formatDate(new Date()),
                      text: record.text,
                      trainingId,
                      type: isRecomendations ? 1 : 2,
                      userId: record.userId,
                      status: 2,
                      rate: isRecomendations ? null : record.rate,
                    });
                    setData((prev) =>
                      prev.map((feedback) =>
                        feedback.feedbackId === record.feedbackId
                          ? { ...feedback, disabledBtn: true }
                          : { ...feedback }
                      )
                    );
                  }}
                  disabled={record.disabledBtn}
                >
                  Отклонить
                </Button>
              </span>
            </>
          );
        } else if (text == "1") {
          return (
            <span className="reviews-and-recomends-table-status__green">
              Принят
            </span>
          );
        } else {
          return (
            <span className="reviews-and-recomends-table-status__red">
              Отклонен
            </span>
          );
        }
      },
    },
  ];

  React.useEffect(() => {
    const temp = (feedbacks as any).map((feedback: any) =>
      fetch(`https://dev-690537.okta.com/api/v1/users/${feedback.userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "SSWS 00EGIFlOyw8lsXwv7JkEMxeKPoXAONyDJ0pJ7rUvp6", //api token
        },
      })
        .then((res) => res.json())
        .then((user) => user)
    );

    Promise.all(temp).then((res) => {
      const obj = res.reduce((acc: any, cur: any) => {
        if (acc[`${cur.id}`]) {
          return acc;
        } else {
          if (cur.profile) {
            acc[
              `${cur.id}`
            ] = `${cur.profile.firstName} ${cur.profile.lastName}`;
          }
          return acc;
        }
      }, {});
      setObjWithFullnames(obj);
    });

    feedbacks && setData(feedbacks);
  }, [feedbacks]);

  return (
    <Table
      className="reviews-and-recomends-table"
      bordered
      columns={columns}
      dataSource={data}
      onHeaderRow={(column) => {
        return {
          className: "reviews-and-recomends-table__header",
        };
      }}
      pagination={{
        position: ["bottomCenter"],
        itemRender: (page, type, originalElement) => {
          switch (type) {
            case "page":
              return (
                <div className="reviews-and-recomends-table__footer-page">
                  {page}
                </div>
              );
            case "prev":
              return (
                <div className="reviews-and-recomends-table__footer-prev-btn">
                  ᐸ Пред.
                </div>
              );
            case "next":
              return (
                <div className="reviews-and-recomends-table__footer-next-btn">
                  След. ᐳ
                </div>
              );
            default:
              return originalElement;
          }
        },
      }}
    />
  );
};
