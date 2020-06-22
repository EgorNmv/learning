import React from "react";
import { Carousel } from "antd";
import { TrainingCard } from "../../components/TrainingCard/TrainingCard";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import { graphql } from "react-relay";
import { useLazyLoadQuery, usePreloadedQuery } from "react-relay/hooks";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import { AppQuery } from "../../__generated__/AppQuery.graphql";
import { appQuery, resultOfPreloadQuery } from "../../App";

const query = graphql`
  query MainQuery {
    newTrainings {
      trainingId: id
      name
      label
      organizer {
        name
      }
      start
      end
      description
    }
    comingTrainings {
      trainingId: id
      name
      label
      organizer {
        name
      }
      start
      end
      description
    }
  }
`;

const Main: React.FC = () => {
  const { newTrainings, comingTrainings } = useLazyLoadQuery<MainQuery>(
    query,
    {}
  );
  const { categories } = usePreloadedQuery<AppQuery>(
    appQuery,
    resultOfPreloadQuery
  );

  return (
    <>
      <section>
        <h2>Новые события</h2>
        <Carousel autoplay>
          {newTrainings.map((training) => (
            <TrainingCard training={training} />
          ))}
        </Carousel>
      </section>
      <section>
        <h2>Ближайшие события</h2>
        <Carousel autoplay>
          {comingTrainings.map((training) => (
            <TrainingCard training={training} />
          ))}
        </Carousel>
      </section>
      <section>
        <h2>Категории событий</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {categories.map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Main;
