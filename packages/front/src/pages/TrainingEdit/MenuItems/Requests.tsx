import React from "react";
import { Table, Button } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { RequestsQuery } from "./__generated__/RequestsQuery.graphql";
import { RequestsMutation } from "./__generated__/RequestsMutation.graphql";
import { useParams } from "react-router-dom";
import { AlertContext } from "../../../hoc/Alert/AlertContext";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./requests.css";

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
  const columns: ColumnsType = [
    {
      title: "№",
      dataIndex: "requestId",
      align: "center",
      width: "5rem",
      render: (text, record) => data.indexOf(record) + 1,
    },
    {
      title: (
        <div className="requests-table__event-col">
          <span>ФИО</span>
          <SearchOutlined />
        </div>
      ),
      dataIndex: "userId",
      width: "40rem",
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
      align: "center",
      width: "10rem",
    },
    {
      title: "Статус",
      dataIndex: "status",
      align: "center",
      render: (text: string, record: any) => {
        if (text == "0") {
          return (
            <>
              <Button
                className="requests-table__actions-ok"
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
              <Button
                className="requests-table__actions-cancel"
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
                    onCompleted: (response) => {
                      showAlert("Запрос отклонён");
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
                        "При попытке отклонить запрос произошла ошибка",
                        "error"
                      );
                    },
                  })
                }
              >
                Отклонить
              </Button>
            </>
          );
        } else if (text == "1") {
          return <span className="request-status__green">Принята</span>;
        } else {
          return <span className="request-status__red">Отклонена</span>;
        }
      },
    },
  ];

  React.useEffect(() => {
    const temp = (requestsByTrainingId as any).map((request: any) =>
      fetch(`https://dev-690537.okta.com/api/v1/users/${request.userId}`, {
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

    requestsByTrainingId && setData(requestsByTrainingId as any);
  }, [requestsByTrainingId]);

  return (
    <div>
      <Table
        className="requests-table"
        bordered
        columns={columns}
        dataSource={data}
        rowKey={"requestId"}
        onHeaderRow={(column) => {
          return {
            className: "requests-table__header",
          };
        }}
        pagination={{
          position: ["bottomCenter"],
          itemRender: (page, type, originalElement) => {
            switch (type) {
              case "page":
                return (
                  <div className="requests-table__footer-page">{page}</div>
                );
              case "prev":
                return (
                  <div className="requests-table__footer-prev-btn">ᐸ Пред.</div>
                );
              case "next":
                return (
                  <div className="requests-table__footer-next-btn">След. ᐳ</div>
                );
              default:
                return originalElement;
            }
          },
        }}
      />
    </div>
  );
};
