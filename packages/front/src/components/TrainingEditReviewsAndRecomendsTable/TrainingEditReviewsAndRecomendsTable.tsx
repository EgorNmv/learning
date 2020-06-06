import React from "react";
import { Table, Button } from "antd";

export const TrainingEditReviewsAndRecomendsTable: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Информация",
      dataIndex: "info",
    },
    {
      title: "Содержание",
      dataIndex: "content",
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (text: string, record: any) => (
        <>
          <span>
            <Button type="link">Принять</Button>
          </span>
          <span>
            <Button type="link">Отклонить</Button>
          </span>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      id: 1,
      info: "Иванов Иван Петрович 5 звёзд",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error repellendus explicabo illo, placeat repellat quod aliquid dolores. Officia labore porro libero commodi aperiam aut omnis qui ex facilis odio. Totam?",
      status: 1,
    },
  ];

  return <Table bordered columns={columns} dataSource={data} />;
};
