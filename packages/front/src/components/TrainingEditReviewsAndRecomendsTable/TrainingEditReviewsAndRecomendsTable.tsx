import React from "react";
import { Table, Button } from "antd";
import { InputFeedback } from "../TrainingReviews/__generated__/TrainingReviewsMutation.graphql";
import { formatDate } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { UserContext } from "../../hoc/UserContext/UserContext";

type TrainingEditReviewsAndRecomendsTableProps = {
  feedbacks: {
    feedbackId: number;
    text: string;
    userId: string;
    status: number;
  }[];
  onChangeFeedbackStatus: (feedbackId: number, data: InputFeedback) => void;
  isRecomendations: boolean;
};

export const TrainingEditReviewsAndRecomendsTable: React.FC<TrainingEditReviewsAndRecomendsTableProps> = ({
  feedbacks,
  onChangeFeedbackStatus,
  isRecomendations,
}) => {
  const params = useParams<{ id: string }>();
  const trainingId = Number(params.id);
  const user = React.useContext(UserContext);
  const [data, setData] = React.useState<any[]>(feedbacks);
  const columns = [
    {
      title: "№",
      dataIndex: "feedbackId",
    },
    {
      title: "Информация",
      dataIndex: "userId",
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
                  onClick={() =>
                    onChangeFeedbackStatus(record.feedbackId, {
                      date: formatDate(new Date()),
                      text: record.text,
                      trainingId,
                      type: isRecomendations ? 1 : 2,
                      userId: user.sub,
                      status: 1,
                    })
                  }
                >
                  Принять
                </Button>
              </span>
              <span>
                <Button
                  type="link"
                  onClick={() =>
                    onChangeFeedbackStatus(record.feedbackId, {
                      date: formatDate(new Date()),
                      text: record.text,
                      trainingId,
                      type: isRecomendations ? 1 : 2,
                      userId: user.sub,
                      status: 2,
                    })
                  }
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
    feedbacks && setData(feedbacks);
  }, [feedbacks]);

  return <Table bordered columns={columns} dataSource={data} />;
};
