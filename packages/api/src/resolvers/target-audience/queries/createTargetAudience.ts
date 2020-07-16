import { Connection } from "typeorm";
import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";

export const createTargetAudience = async (
  connection: Connection,
  description: string
): Promise<TargetAudienceEntity> => {
  const targetAudienceFromData: TargetAudienceEntity = await connection
    .getRepository(TargetAudienceEntity)
    .save({ description });

  return targetAudienceFromData;
};
