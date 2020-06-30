import React from "react";
// import { Carousel } from "antd";
import { TrainingCard } from "../../components/TrainingCard/TrainingCard";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import { graphql } from "react-relay";
import { useLazyLoadQuery, usePreloadedQuery } from "react-relay/hooks";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import { AppQuery } from "../../__generated__/AppQuery.graphql";
import { appQuery, resultOfPreloadQuery } from "../../App";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './main.css';
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
  console.log('****************************************************************');
  console.log(newTrainings);
  console.log('****************************************************************');

  const { categories } = usePreloadedQuery<AppQuery>(
    appQuery,
    resultOfPreloadQuery
  );
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  
  return (
    <>
      <section>
        <h2>Новые события</h2>
        <Carousel {...{ responsive }}>
          {newTrainings.map((training) => (
            <TrainingCard training={training} />
          ))}
        </Carousel>
      </section>
      <section>
        <h2>Ближайшие события</h2>
        <Carousel {...{ responsive }}>
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
          {
            categories
              .slice(0, 6)
              .map((category) => (
                <CategoryCard category={category} />
              ))}
        </div>
      </section>
    </>
  );
};

export default Main;
