import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./TrainingCard.css";

export const TrainingCard: React.FC = () => (
  <Card title="Default size card">
    <Link to="/category/1/training/1">
      <h5>Основы Python</h5>
    </Link>
    <div className="training-card-body">
      <div
        style={{
          width: "100px",
          height: "150px",
          background: "gray",
        }}
      />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, neque
          harum laborum commodi voluptatum enim aspernatur molestiae vitae
          inventore? Aperiam totam, dolores soluta excepturi autem illo sed
          tenetur tempore quo?
        </p>
      </div>
    </div>
  </Card>
);
