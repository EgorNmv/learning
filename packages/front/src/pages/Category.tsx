import React from "react";
import { SortableTrainingList } from "../components/SortableTrainingList/SortableTrainingList";
import { CalendarWithEvents } from "../components/CalendarWithEvents/CalendarWithEvents";

const Category: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <section>
        <h2>Программирование</h2>
        <SortableTrainingList />
      </section>
      <section>
        <CalendarWithEvents />
      </section>
    </div>
  );
};

export default Category;
