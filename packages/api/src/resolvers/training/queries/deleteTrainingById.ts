import { Connection } from "typeorm";
import { findTrainingById } from "./findTrainingById";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { FeedbackEntity } from "../../../objects/entities/feedback/entity";
import { MaterialEntity } from "../../../objects/entities/material/entity";
import { RequestEntity } from "../../../objects/entities/request/entity";

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
    const trainingId: number = training.id;
    const feedbacksWithCurrentTrainingId: FeedbackEntity[] = await connection
      .getRepository(FeedbackEntity)
      .find({ where: { trainingId } });
    const materialsWithCurrentTrainingId: MaterialEntity[] = await connection
      .getRepository(MaterialEntity)
      .find({ where: { trainingId } });
    const requestsWithCurrentTrainingId: RequestEntity[] = await connection
      .getRepository(RequestEntity)
      .find({ where: { trainingId } });

    await connection
      .getRepository(FeedbackEntity)
      .softRemove(feedbacksWithCurrentTrainingId);
    await connection
      .getRepository(MaterialEntity)
      .softRemove(materialsWithCurrentTrainingId);
    await connection
      .getRepository(RequestEntity)
      .softRemove(requestsWithCurrentTrainingId);
    await connection.getRepository(TrainingEntity).softRemove(training);

    isTrainingRemoved = true;
  } catch (error) {
    console.info(`Error in deleteTrainingById${error}`);
  }

  return isTrainingRemoved;
};
