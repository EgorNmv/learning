import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

export const TrainingCard: React.FC = () => (
  <div style={{ display: "flex" }}>
    <div
      style={{
        width: "20%",
        background: "gray",
      }}
    />
    <Card title="Default size card">
      <Link to="/category/1/training/1"><h5>Основы Python</h5></Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, neque
        harum laborum commodi voluptatum enim aspernatur molestiae vitae
        inventore? Aperiam totam, dolores soluta excepturi autem illo sed
        tenetur tempore quo?
      </p>
    </Card>
  </div>
);
