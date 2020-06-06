import React from "react";
import { Card } from "antd";
import { TrainingForm } from "../../components/TrainingForm/TrainingForm";

const TrainingCreate: React.FC = () => {
  return (
    <>
      <h1>Создание события</h1>
      <section>
        <Card>
          <TrainingForm />
        </Card>
      </section>
    </>
  );
};

export default TrainingCreate;
