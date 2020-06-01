import React from "react";
import { Carousel } from "antd";
import { TrainingCard } from "../components/TrainingCard/TrainingCard";
import { CategoryCard } from "../components/CategoryCard/CategoryCard";

const Main: React.FC = () => {
  return (
    <div>
      <section>
        <h2>Новые события</h2>
        <Carousel dotPosition="bottom">
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
        </Carousel>
      </section>
      <section>
        <h2>Ближайшие события</h2>
        <Carousel dotPosition="bottom">
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TrainingCard />
              <TrainingCard />
            </div>
          </div>
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
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
