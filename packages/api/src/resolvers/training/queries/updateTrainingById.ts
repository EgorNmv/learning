import { Connection } from "typeorm";
import { InputTraining } from "../../../objects/input-objects/inputTraining";
import { findTrainingById } from "./findTrainingById";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const updateTrainingById = async (
  connection: Connection,
  id: number,
  data: Partial<InputTraining>
): Promise<TrainingEntity> => {
  const training: TrainingEntity = await connection
    .getRepository(TrainingEntity)
    .findOne({
      where: { id },
    });

  if (!training) {
    throw new Error(`Training with id ${id} not found`);
  }

  const updatedTraining: TrainingEntity = await connection
    .getRepository(TrainingEntity)
    .save({ ...training, ...data });

  return await findTrainingById(connection, id);
};
