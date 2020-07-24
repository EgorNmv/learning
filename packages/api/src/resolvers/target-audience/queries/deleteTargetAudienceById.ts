import { Connection } from "typeorm";
import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { findTargetAudienceById } from "./findTargetAudienceById";
import { TrainingEntity } from "../../../objects/entities/training/entity";
import { deleteTrainingById } from "../../training/queries/deleteTrainingById";

export const deleteTargetAudienceById = async (
  connection: Connection,
  id: number
): Promise<boolean> => {
  const targetAudience: TargetAudienceEntity = await findTargetAudienceById(
    connection,
    id
  );
  let isTargetAudienceRemoved: boolean = false;

  if (!targetAudience) {
    throw new Error(`Target audience with id ${id} not found`);
  }

  try {
    const audienceId: number = targetAudience.id;
    const trainingsWithTargetAudence: TrainingEntity[] = await connection
      .getRepository(TrainingEntity)
      .find({ where: { audienceId } });

    trainingsWithTargetAudence.forEach((training) =>
      deleteTrainingById(connection, training.id)
    );
    await connection
      .getRepository(TargetAudienceEntity)
      .softRemove(targetAudience);

    isTargetAudienceRemoved = true;
  } catch (error) {
    console.info(`Error in deleteTargetAudienceById: ${error}`);
  }

  return isTargetAudienceRemoved;
};
