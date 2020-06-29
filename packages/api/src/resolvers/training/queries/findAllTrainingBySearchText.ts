import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";

export const findAllTrainingBySearchText = async (
  connection: Connection,
  searchBy: string,
  searchText: string
): Promise<TrainingEntity[]> => {
  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .createQueryBuilder()
    .select()
    .where(`${searchBy} ILIKE :searchText`, { searchText: `%${searchText}` })
    .getMany();

  return trainings;
};
