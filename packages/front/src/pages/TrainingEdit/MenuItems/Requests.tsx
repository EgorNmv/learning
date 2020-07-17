import React from "react";
import { Table, Button } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { RequestsQuery } from "./__generated__/RequestsQuery.graphql";
import { RequestsMutation } from "./__generated__/RequestsMutation.graphql";
import { useParams } from "react-router-dom";
import { AlertContext } from "../../../hoc/Alert/AlertContext";

const query = graphql`
  query RequestsQuery($trainingId: Float!) {
    requestsByTrainingId(trainingId: $trainingId) {
      requestId: id
      userId
      date
      status
    }
  }
`;

const mutation = graphql`
  mutation RequestsMutation($requestId: Float!, $data: InputRequest!) {
    updateRequestById(id: $requestId, data: $data) {
      requestId: id
      userId
      date
      status
    }
  }
`;

export const Requests: React.FC = () => {
  const trainingId: number = Number(
    useParams<{ trainingId: string }>().trainingId
  );
  const [objWithFullnames, setObjWithFullnames] = React.useState<any>({});
  const { requestsByTrainingId } = useLazyLoadQuery<RequestsQuery>(query, {
    trainingId,
  });
  const [commit, isInFlight] = useMutation<RequestsMutation>(mutation);
  const [data, setData] = React.useState<any[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const columns = [
    {
      title: "№",
      dataIndex: "requestId",
    },
    {
      title: "ФИО",
      dataIndex: "userId",
      render: (text: string, record: any) => {
        return (
          <span>
            {objWithFullnames[`${text}`]
              ? objWithFullnames[`${text}`]
              : "Loading..."}
          </span>
        );
      },
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
          return (
            <>
              <span>
                <Button
                  type="link"
                  disabled={isInFlight}
                  onClick={() =>
                    commit({
                      variables: {
                        requestId: record.requestId,
                        data: {
                          date: record.date,
                          trainingId,
                          userId: record.userId,
                          status: 1,
                        },
                      },
                      onCompleted: (response) => {
                        showAlert("Запрос принят");
                        setData((prev) =>
                          prev.map((request) =>
                            request.requestId ===
                            response.updateRequestById.requestId
                              ? {
                                  ...request,
                                  status: response.updateRequestById.status,
                                }
                              : { ...request }
                          )
                        );
                      },
                      onError: () => {
                        showAlert(
                          "При попытке принять запрос произошла ошибка",
                          "error"
                        );
                      },
                    })
                  }
                >
                  Принять
                </Button>
              </span>
              <span>
                <Button
                  type="link"
                  disabled={isInFlight}
                  onClick={() =>
                    commit({
                      variables: {
                        requestId: record.requestId,
                        data: {
                          date: record.date,
                          trainingId,
                          userId: record.userId,
                          status: 2,
                        },
                      },
                      onCompleted: () => {
                        showAlert("Запрос отклонён");
                      },
                      onError: () => {
                        showAlert(
                          "При попытке отклонить запрос произошла ошибка",
                          "error"
                        );
                      },
                    })
                  }
                >
                  Отклонить
                </Button>
              </span>
            </>
          );
        } else if (text == "1") {
          return <span>Принята</span>;
        } else {
          return <span>Отклонена</span>;
        }
      },
    },
  ];

  React.useEffect(() => {
    const temp = (requestsByTrainingId as any).map((request: any) =>
      fetch(`https://dev-417692.okta.com/api/v1/users/${request.userId}`, {
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

    requestsByTrainingId && setData(requestsByTrainingId as any);
  }, [requestsByTrainingId]);

  return (
    <div>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};
