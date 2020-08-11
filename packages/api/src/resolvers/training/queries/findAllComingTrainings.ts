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
  const sortedTrainings = trainings
    .filter((training) => {
      const [dd, mm, yy]: number[] = training.start.split(".").map(Number);
      const trainingStartDate: Date = new Date(Number(`20${yy}`), mm - 1, dd);

      return currentDate <= trainingStartDate;
    })
    .sort((trainingA, trainingB) => {
      const [ddA, mmA, yyA]: number[] = trainingA.start.split(".").map(Number);
      const dateA: Date = new Date(Number(`20${yyA}`), mmA, ddA);
      const [ddB, mmB, yyB]: number[] = trainingB.start.split(".").map(Number);
      const dateB: Date = new Date(Number(`20${yyB}`), mmB, ddB);

      return <any>dateA - <any>dateB;
    });

  return sortedTrainings;
};
