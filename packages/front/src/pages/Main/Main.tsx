import React from "react";
import { TrainingCard } from "../../components/TrainingCard/TrainingCard";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./main.css";
import { DotProps } from "react-multi-carousel/lib/types";
import { Link } from "react-router-dom";

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
      isDateSet
      description
      category {
        categoryId: id
        description
      }
      format {
        description
      }
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
      isDateSet
      description
      category {
        categoryId: id
        description
      }
      format {
        description
      }
    }
    categories {
      categoryId: id
      description
      label
    }
  }
`;

const Main: React.FC = () => {
  const { newTrainings, comingTrainings, categories } = useLazyLoadQuery<
    MainQuery
  >(query, {});
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const CustomDotForSlider: React.FC<DotProps> = ({
    index,
    active,
    onClick,
    carouselState,
  }) => {
    if (index && onClick) {
      const classNames = ["custom-dot-for-slider"].concat(
        active ? "active" : "inactive"
      );
      return (
        <span className={classNames.join(" ")} onClick={() => onClick()} />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <section>
        <div className="main-section__trainings-titles">
          <h2 className="main-section-title">Новые события</h2>
          <Link to="/categories">Смотреть все</Link>
        </div>
        <Carousel
          {...{ responsive }}
          showDots
          customDot={<CustomDotForSlider />}
          containerClass="carousel-with-custom-dots"
        >
          {newTrainings.map((training) => (
            <TrainingCard
              training={training}
              key={`${training.trainingId}${training.name}`}
            />
          ))}
        </Carousel>
      </section>
      <section>
        <div className="main-section__trainings-titles">
          <h2 className="main-section-title">Ближайшие события</h2>
          <Link to="/categories">Смотреть все</Link>
        </div>
        <Carousel
          {...{ responsive }}
          showDots
          customDot={<CustomDotForSlider />}
          containerClass="carousel-with-custom-dots"
        >
          {comingTrainings.map((training) => (
            <TrainingCard
              training={training}
              key={`${training.trainingId}${training.name}`}
            />
          ))}
        </Carousel>
      </section>
      <section>
        <h2 className="main-section-title">Категории событий</h2>
        <div className="main-section__categories">
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={`${category.categoryId}${category.description}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Main;
