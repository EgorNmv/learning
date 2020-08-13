import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const breadcrumbNameMap: { [path: string]: string } = {
  "/categories": "Все события",
  "/category/:id": "Категория",
  "/category/:categoryId/training/:trainingId": "Событие",
  "/profile/editing": "Редактирование профиля",
  "/profile/requests": "Мои запросы",
  "/profile/reviews": "Мои отзывы",
  "/profile/recomendations": "Мои рекомендации",
  "/help": "Помощь",
  "/profile/trainings": "Все события",
  "/profile/directories": "Справочники",
  "/profile/directories/categories": "Категории",
  "/profile/directories/categories/create": "Создание категории",
  "/profile/directories/categories/edit/:id": "Редактирование категории",
  "/profile/directories/targetaudiences": "Целевые аудитории",
  "/profile/directories/targetaudiences/create": "Создание целевой аудитории",
  "/profile/directories/targetaudiences/edit/:id":
    "Редактирование целевой аудитории",
  "/profile/directories/trainingformats": "Форматы обучения",
  "/profile/directories/trainingformats/create": "Создание формата обучения",
  "/profile/directories/trainingformats/edit/:id":
    "Редактирование формата обучения",
  "/profile/directories/organizers": "Организаторы",
  "/profile/directories/organizers/create": "Создание организатора",
  "/profile/directories/organizers/edit/:id": "Редактирование организатора",
  "/profile/trainings/create": "Создание события",
  "/profile/trainings/edit/:trainingId": "Редактирование события",
};

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const pathSnippets: string[] = pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    if (!breadcrumbNameMap[url]) {
      return <></>;
    }

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems: JSX.Element[] = [
    <Breadcrumb.Item key="home">
      <Link to="/">Главная</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb separator="»">{breadcrumbItems}</Breadcrumb>;
};
