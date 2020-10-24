import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { BreadcrumbsQuery } from "./__generated__/BreadcrumbsQuery.graphql";

const query = graphql`
  query BreadcrumbsQuery($categoryId: Float!, $trainingId: Float!) {
    training(id: $trainingId) {
      name
    }
    category(id: $categoryId) {
      description
    }
  }
`;

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
  const params = useParams<{
    id?: string;
    categoryId?: string;
    trainingId?: string;
  }>();
  const [trainingIdInParams, setTrainingIdInParams] = React.useState<
    number | null
  >(null);
  const [categoryIdInParams, setCategoryIdInParams] = React.useState<
    number | null
  >(null);
  const { training, category } = useLazyLoadQuery<BreadcrumbsQuery>(query, {
    categoryId: categoryIdInParams || 0,
    trainingId: trainingIdInParams || 0,
  });
  const [breadcrumbTrainingName, setBreadcrubmTrainingName] = React.useState<
    string | null
  >(null);
  const [breadcrumbCategoryName, setBreadcrubmCategoryName] = React.useState<
    string | null
  >(null);
  const pathSnippets: string[] = pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    let urlName = breadcrumbNameMap[url];

    if (!urlName) {
      if (!breadcrumbTrainingName && !breadcrumbCategoryName) {
        return <></>;
      }

      const isCategoryInPath: boolean =
        ["categories", "category"].filter((name) =>
          pathname.split("/").includes(name)
        ).length > 0;
      const isTrainingInPath: boolean =
        ["trainings", "training"].filter((name) =>
          pathname.split("/").includes(name)
        ).length > 0;

      if (isCategoryInPath && isTrainingInPath) {
        urlName = breadcrumbTrainingName || "T";
      } else if (isCategoryInPath) {
        urlName = breadcrumbCategoryName || "C";
      }
    }

    return (
      <Breadcrumb.Item key={url}>
        {index + 1 !== pathSnippets.length ? (
          <Link to={url}>{urlName}</Link>
        ) : (
          <span>{urlName}</span>
        )}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems: JSX.Element[] = [
    <Breadcrumb.Item key="home">
      <Link to="/">Главная</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  React.useEffect(() => {
    if (
      (!breadcrumbTrainingName || !breadcrumbCategoryName) &&
      (!trainingIdInParams || !categoryIdInParams)
    ) {
      const isCategoryInPath: boolean =
        ["categories", "category"].filter((name) =>
          pathname.split("/").includes(name)
        ).length > 0;
      const isTrainingInPath: boolean =
        ["trainings", "training"].filter((name) =>
          pathname.split("/").includes(name)
        ).length > 0;

      if (
        (isCategoryInPath &&
          isTrainingInPath &&
          !breadcrumbTrainingName &&
          !trainingIdInParams) ||
        (isTrainingInPath && !breadcrumbTrainingName && !trainingIdInParams)
      ) {
        const trainingId: number =
          Number(params.trainingId) || Number(params.id);

        if (trainingId) {
          setTrainingIdInParams(trainingId);
        }
      } else if (
        isCategoryInPath &&
        !breadcrumbCategoryName &&
        !categoryIdInParams
      ) {
        const categoryId: number =
          Number(params.categoryId) || Number(params.id);

        if (categoryId) {
          setCategoryIdInParams(categoryId);
        }
      }
    } else {
      setBreadcrubmTrainingName(training?.name || null);
      setBreadcrubmCategoryName(category?.description || null);
    }
  }, [category, training]);

  return <Breadcrumb separator="»">{breadcrumbItems}</Breadcrumb>;
};
