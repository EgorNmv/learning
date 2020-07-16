import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { Connection } from "typeorm";

export const findAllTargetAudiences = async (
  connection: Connection
): Promise<TargetAudienceEntity[]> => {
  return await connection
    .getRepository(TargetAudienceEntity)
    .find({ order: { id: "ASC" } });
};
