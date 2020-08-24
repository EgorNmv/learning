import { Connection } from "typeorm";
import { MaterialEntity } from "../../../objects/entities/material/entity";

export const findMaterialsByTrainingId = async (
  connection: Connection,
  trainingId: number
): Promise<MaterialEntity[]> => {
  const materialsByTrainingId: MaterialEntity[] = await connection
    .getRepository(MaterialEntity)
    .find({
      relations: [
        "training",
        "training.format",
        "training.organizer",
        "training.audience",
      ],
      where: { trainingId },
    });

  return materialsByTrainingId;
};
