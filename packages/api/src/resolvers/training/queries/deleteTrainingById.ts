import { Connection } from "typeorm";
import { findTrainingById } from "./findTrainingById";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const deleteTrainingById = async (
  connection: Connection,
  id: number
): Promise<boolean> => {
  const training: TrainingEntity = await findTrainingById(connection, id);
  let isTrainingRemoved: boolean = false;

  if (!training) {
    throw new Error(`Training with id ${id} not found`);
  }

  try {
    await connection.getRepository(TrainingEntity).softRemove(training);
    isTrainingRemoved = true;
  } catch (error) {
    console.info(`Error in deleteTrainingById${error}`);
  }

  return isTrainingRemoved;
};
