import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { Connection } from "typeorm";

export const findTargetAudienceById = async (
  connection: Connection,
  id: number
): Promise<TargetAudienceEntity | null> => {
  const targetAudience: TargetAudienceEntity = await connection
    .getRepository(TargetAudienceEntity)
    .findOne(id);

  if (!targetAudience) {
    return null;
  }

  return targetAudience;
};
