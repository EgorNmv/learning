import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";

export const findAllTrainingsForReport = async (
  connection: Connection,
  categoryId: number,
  organizerId: number,
  targetAudienceId: number,
  formatId: number,
  startDate: string,
  endDate: string
): Promise<TrainingEntity[]> => {
  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .find({
      where: {
        categoryId,
        organizerId,
        audienceId: targetAudienceId,
        formatId,
      },
      relations: ["organizer"],
    });
  /**
   * TODO: also sort by date later
   */

  return trainings;
};
