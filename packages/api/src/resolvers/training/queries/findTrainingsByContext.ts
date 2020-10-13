import { Connection } from "typeorm";
import { TrainingEntity } from "../../../objects/entities/training/entity";

export const findTrainingsByContext = async (
  connection: Connection,
  searchText: string
): Promise<TrainingEntity[]> => {
  if (!searchText) {
    return [];
  }

  const trainings: TrainingEntity[] = await connection
    .getRepository(TrainingEntity)
    .createQueryBuilder("training")
    .leftJoinAndSelect("training.category", "category")
    .leftJoinAndSelect("training.format", "format")
    .leftJoinAndSelect("training.audience", "audience")
    .where(`training.name ILIKE :searchText`, {
      searchText: `%${searchText}%`,
    })
    .orWhere("training.description ILIKE :searchText", {
      searchText: `%${searchText}%`,
    })
    .orWhere("training.start ILIKE :searchText", {
      searchText: `%${searchText}%`,
    })
    .orWhere("training.end ILIKE :searchText", {
      searchText: `%${searchText}%`,
    })
    .getMany();

  return trainings;
};
