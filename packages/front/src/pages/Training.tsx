import React from "react";
import { TrainingCard } from "../components/TrainingCard/TrainingCard";
import { Card } from "antd";
import { TrainingMaterials } from "../components/TrainingMaterials/TrainingMaterials";
import { TrainingRecommendations } from "../components/TrainingRecommendations/TrainingRecommendations";
import { TrainingReviews } from "../components/TrainingReviews/TrainingReviews";

const Training: React.FC = () => {
  return (
    <>
      <section>
        <TrainingCard />
        <Card>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          expedita, laboriosam, perspiciatis voluptatibus nulla voluptatem at
          molestias itaque cum dignissimos minus eos veritatis temporibus
          impedit repudiandae reprehenderit nihil velit officiis!
        </Card>
      </section>
      <section>
        <TrainingMaterials />
      </section>
      <section>
        <TrainingRecommendations />
      </section>
      <section>
        <TrainingReviews />
      </section>
    </>
  );
};

export default Training;
