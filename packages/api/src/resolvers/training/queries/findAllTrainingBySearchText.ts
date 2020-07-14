import { TrainingEntity } from "../../../objects/entities/training/entity";
import { Connection } from "typeorm";

export const findAllTrainingBySearchText = async (
  connection: Connection,
  searchBy: "name" | "date" | "format" | "audience" | "category",
  searchText: string
): Promise<TrainingEntity[]> => {
  if (!searchText) {
    return [];
  }

  switch (searchBy) {
    case "name": {
      const trainings: TrainingEntity[] = await connection
        .getRepository(TrainingEntity)
        .createQueryBuilder("training")
        .leftJoinAndSelect("training.category", "category")
        .leftJoinAndSelect("training.format", "format")
        .leftJoinAndSelect("training.audience", "audience")
        .where(`${searchBy} ILIKE :searchText`, {
          searchText: `%${searchText}%`,
        })
        .orWhere("training.description ILIKE :searchText", {
          searchText: `%${searchText}%`,
        })
        .getMany();

      return trainings;
    }
    case "date": {
      const trainings: TrainingEntity[] = await connection
        .getRepository(TrainingEntity)
        .createQueryBuilder("training")
        .leftJoinAndSelect("training.category", "category")
        .leftJoinAndSelect("training.format", "format")
        .leftJoinAndSelect("training.audience", "audience")
        .where("training.start ILIKE :searchText", {
          searchText: `%${searchText}%`,
        })
        .orWhere("training.end ILIKE :searchText", {
          searchText: `%${searchText}%`,
        })
        .getMany();

      return trainings;
    }
    case "format": {
      const trainings: TrainingEntity[] = await connection
        .getRepository(TrainingEntity)
        .createQueryBuilder("training")
        .leftJoinAndSelect("training.category", "category")
        .leftJoinAndSelect("training.format", "format")
        .leftJoinAndSelect("training.audience", "audience")
        .where("format.description ILIKE :searchText", {
          searchText: `%${searchText}%`,
        })
        .getMany();

      return trainings;
    }
    case "audience": {
      const trainings: TrainingEntity[] = await connection
        .getRepository(TrainingEntity)
        .createQueryBuilder("training")
        .leftJoinAndSelect("training.category", "category")
        .leftJoinAndSelect("training.format", "format")
        .leftJoinAndSelect("training.audience", "audience")
        .where("audience.description ILIKE :searchText", {
          searchText: `%${searchText}%`,
        })
        .getMany();

      return trainings;
    }
    case "category": {
      const trainings: TrainingEntity[] = await connection
        .getRepository(TrainingEntity)
        .createQueryBuilder("training")
        .leftJoinAndSelect("training.category", "category")
        .leftJoinAndSelect("training.format", "format")
        .leftJoinAndSelect("training.audience", "audience")
        .where("category.description ILIKE :searchText", {
          searchText: `%${searchText}%`,
        })
        .getMany();

      return trainings;
    }
  }
};
