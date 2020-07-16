import { Connection } from "typeorm";
import { InputTraining } from "../../../objects/input-objects/inputTraining";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { findTrainingById } from "./findTrainingById";

export const createTraining = async (
  connection: Connection,
  data: InputTraining
): Promise<TrainingEntity> => {
  const { id }: TrainingEntity = await connection
    .getRepository(TrainingEntity)
    .save({ ...data });
  const newTraining: TrainingEntity = await findTrainingById(connection, id);

  return newTraining;
};
