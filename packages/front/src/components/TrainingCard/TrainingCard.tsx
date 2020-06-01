import React from "react";
import { Card } from "antd";

export const TrainingCard: React.FC = () => (
  <div style={{ display: "flex" }}>
    <div
      style={{
        width: "20%",
        background: "gray",
      }}
    />
    <Card title="Default size card">
      <h5>Основы Python</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, neque
        harum laborum commodi voluptatum enim aspernatur molestiae vitae
        inventore? Aperiam totam, dolores soluta excepturi autem illo sed
        tenetur tempore quo?
      </p>
    </Card>
  </div>
);
