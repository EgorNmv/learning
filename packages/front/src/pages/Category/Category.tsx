import React from "react";
import "./Category.css";
import { SortableTrainingList } from "../../components/SortableTrainingList/SortableTrainingList";
import { CalendarWithEvents } from "../../components/CalendarWithEvents/CalendarWithEvents";

const Category: React.FC = () => {
  return (
    <div className="category-page-content">
      <section>
        <h2>Программирование</h2>
        <SortableTrainingList />
      </section>
      <section className="category-page-content-calendar">
        <CalendarWithEvents />
      </section>
    </div>
  );
};

export default Category;
