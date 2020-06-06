import React from "react";
import { Table, Card } from "antd";

const UserProfileReviews: React.FC = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Информация",
      dataIndex: "information",
    },
    {
      title: "Содержание",
      dataIndex: "content",
    },
    {
      title: "Статус",
      dataIndex: "status",
    },
  ];
  const data = [
    {
      key: 1,
      id: 1,
      information: "Основы python \n 5 баллов",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae nemo, assumenda libero esse facere et ipsa dolorum saepe veritatis maxime culpa aperiam praesentium velit. Quam nemo repellendus molestias placeat omnis.",
      status: "В обработке",
    },
    {
      key: 2,
      id: 2,
      information: "Основы python \n 4 балла",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ut dolorum animi accusamus quos, libero consequatur beatae, numquam iusto repellendus enim nulla expedita? Nemo id odit iure sunt libero consequatur?",
      status: "Принята",
    },
    {
      key: 3,
      id: 3,
      information: "Основы python \n 5 баллов",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit mollitia blanditiis reiciendis sapiente ex distinctio? Cupiditate neque, nulla pariatur ipsum iure voluptate porro non vel dolore molestiae inventore numquam? Eos.",
      status: "Отклонена",
    },
  ];

  return (
    <section>
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
