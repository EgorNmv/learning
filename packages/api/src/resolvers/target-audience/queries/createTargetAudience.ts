import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";

export const createTargetAudience = async (
    connection: Connection,
    description: string
): Promise<TargetAudienceEntity> => {
    const targetAudienceFromData: TargetAudienceEntity = await connection.getRepository(TargetAudienceEntity)
        .save({ description });

    return targetAudienceFromData;
}