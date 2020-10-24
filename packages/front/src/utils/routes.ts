type Route = {
  link: RegExp;
  label?: string;
};

export const routes: Route[] = [
  {
    link: /^\/categories$/g,
    label: "Все события",
  },
  {
    link: /^\/category\/[0-9]+$/g,
  },
  {
    link: /^\/category\/[0-9]+\/training\/[0-9]+$/g,
  },
  {
    link: /^\/profile\/requests$/g,
    label: "Мои заявки",
  },
  {
    link: /^\/profile\/reviews$/g,
    label: "Мои отзывы",
  },
  {
    link: /^\/profile\/recomendations$/g,
    label: "Мои рекомендации",
  },
  {
    link: /^\/help$/g,
    label: "Помощь",
  },
  {
    link: /^\/profile\/trainings$/g,
    label: "Все события",
  },
  {
    link: /^\/profile\/directories$/g,
    label: "Справочники",
  },
  {
    link: /^\/profile\/directories\/categories$/g,
    label: "Категории",
  },
  {
    link: /^\/profile\/directories\/categories\/create$/g,
    label: "Создание категории",
  },
  {
    link: /^\/profile\/directories\/categories\/create$/g,
    label: "Создание категории",
  },
  {
    link: /^\/profile\/directories\/categories\/edit\/[0-9]+$/g,
  },
  {
    link: /^\/profile\/directories\/targetaudiences$/g,
    label: "Целевые аудитории",
  },
  {
    link: /^\/profile\/directories\/targetaudiences\/create$/g,
    label: "Создание целевой аудитории",
  },
  {
    link: /^\/profile\/directories\/targetaudiences\/edit\/[0-9]+$/g,
  },
  {
    link: /^\/profile\/directories\/trainingformats$/g,
    label: "Форматы обучения",
  },
  {
    link: /^\/profile\/directories\/trainingformats\/create$/g,
    label: "Создание формата обучения",
  },
  {
    link: /^\/profile\/directories\/trainingformats\/edit\/[0-9]+$/g,
  },
  {
    link: /^\/profile\/directories\/organizers$/g,
    label: "Организаторы",
  },
  {
    link: /^\/profile\/directories\/organizers\/create$/g,
    label: "Создание организатора",
  },
  {
    link: /^\/profile\/directories\/organizers\/edit\/[0-9]+$/g,
  },
  {
    link: /^\/profile\/trainings\/create$/g,
    label: "Создание события",
  },
  {
    link: /^\/profile\/trainings\/edit\/[0-9]+$/g,
  },
];
