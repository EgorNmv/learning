import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { findTargetAudienceById } from "./findTargetAudienceById";

export const updateTargetAudienceById = async (
    connection: Connection,
    id: number,
    description: string
): Promise<TargetAudienceEntity> => {
    const targetAudience: TargetAudienceEntity = await findTargetAudienceById(connection, id);

    if (!targetAudience) {
        throw new Error(`Target audience with id:${id} not found`);
    }

    const updatedTargetAudience: TargetAudienceEntity = await connection.getRepository(TargetAudienceEntity)
        .save({ ...targetAudience, description })

    return updatedTargetAudience;
}