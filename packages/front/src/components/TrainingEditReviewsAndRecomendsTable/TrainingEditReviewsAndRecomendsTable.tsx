import React from "react";
import { Table, Button, Rate } from "antd";
import { InputFeedback } from "../TrainingReviews/__generated__/TrainingReviewsMutation.graphql";
import { formatDate } from "../../utils/utils";
import { useParams } from "react-router-dom";

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
  const columns = [
    {
      title: "№",
      dataIndex: "feedbackId",
    },
    {
      title: "Информация",
      dataIndex: "userId",
      render: (text: string, record: any) => {
        return (
          <>
            <p>
              {objWithFullnames[`${text}`]
                ? objWithFullnames[`${text}`]
                : "Loading..."}
            </p>
            <p>{record.date}</p>
            {record.rate && (
              <p>
                <Rate disabled value={record.rate} />
              </p>
            )}
          </>
        );
      },
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
          return (
            <>
              <span>
                <Button
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
          return <span>Принят</span>;
        } else {
          return <span>Отклонен</span>;
        }
      },
    },
  ];

  React.useEffect(() => {
    const temp = (feedbacks as any).map((feedback: any) =>
      fetch(`https://dev-417692.okta.com/api/v1/users/${feedback.userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `SSWS 00Qgcob9EiG1vLxyRoY2czkSeSYcpzTRAFg-TjjiVl`, //api token
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
          acc[`${cur.id}`] = `${cur.profile.firstName} ${cur.profile.lastName}`;
          return acc;
        }
      }, {});
      setObjWithFullnames(obj);
    });

    feedbacks && setData(feedbacks);
  }, [feedbacks]);

  return <Table bordered columns={columns} dataSource={data} />;
};
