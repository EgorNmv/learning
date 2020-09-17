import { Connection } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const findAllNewTrainings = async (
  connection: Connection
): Promise<TrainingEntity[]> => {
  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .find({
      relations: ["format", "organizer", "audience", "category"],
    });
  const sortedTrainings: TrainingEntity[] = trainings
    .sort((trainingA, trainingB) => {
      return trainingB.createDate.getTime() - trainingA.createDate.getTime();
    })
    .slice(0, 19);

  return sortedTrainings;
};
