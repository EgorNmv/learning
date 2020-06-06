import React from "react";
import { Menu, Card } from "antd";
import { Options } from "./MenuItems/Options";
import { Requests } from "./MenuItems/Requests";
import { Reviews } from "./MenuItems/Reviews";
import { Recomendations } from "./MenuItems/Recomendations";

const TrainingEdit: React.FC = () => {
  const [currentMenu, setCurrentMenu] = React.useState<string>("options");
  const menu: { [key: string]: React.FC } = {
    options: Options,
    requests: Requests,
    reviews: Reviews,
    recomendations: Recomendations,
  };
  const MenuItem: React.FC = menu[currentMenu];

  const handleClick = (e: any) => {
    setCurrentMenu(e.key);
  };

  return (
    <section>
      <span>
        <h1>Редактирование события</h1>
      </span>
      <Card>
        <Menu
          onClick={handleClick}
          selectedKeys={[currentMenu]}
          mode="horizontal"
        >
          <Menu.Item key="options">Параметры</Menu.Item>
          <Menu.Item key="requests">Заявки</Menu.Item>
          <Menu.Item key="reviews">Отзывы</Menu.Item>
          <Menu.Item key="recomendations">Рекомендации</Menu.Item>
        </Menu>
        <MenuItem />
      </Card>
    </section>
  );
};

export default TrainingEdit;
