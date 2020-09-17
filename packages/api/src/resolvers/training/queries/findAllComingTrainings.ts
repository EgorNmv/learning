import { Connection } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const findAllComingTrainings = async (
  connection: Connection
): Promise<TrainingEntity[]> => {
  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .find({
      relations: ["format", "organizer", "audience", "category"],
      where: { isDateSet: true },
    });
  const currentDate: Date = new Date();

  currentDate.setHours(0, 0, 0, 0);

  const sortedTrainings: TrainingEntity[] = trainings
    .filter((training) => {
      const [dd, mm, yy]: number[] = training.start.split(".").map(Number);
      const trainingStartDate: Date = new Date(yy, mm - 1, dd);

      return currentDate <= trainingStartDate;
    })
    .sort((trainingA, trainingB) => {
      const [ddA, mmA, yyA]: number[] = trainingA.start.split(".").map(Number);
      const dateA: Date = new Date(yyA, mmA, ddA);
      const [ddB, mmB, yyB]: number[] = trainingB.start.split(".").map(Number);
      const dateB: Date = new Date(yyB, mmB, ddB);

      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 19);

  return sortedTrainings;
};
