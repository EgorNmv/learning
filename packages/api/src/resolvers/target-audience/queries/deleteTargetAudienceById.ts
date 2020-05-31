import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { findTargetAudienceById } from "./findTargetAudienceById";

export const deleteTargetAudienceById = async (
    connection: Connection,
    id: number
): Promise<boolean> => {
    const targetAudience: TargetAudienceEntity = await findTargetAudienceById(connection, id);
    let isTargetAudienceRemoved: boolean = false;

    if (!targetAudience) {
        throw new Error(`Target audience with id ${id} not found`);
    }

    try {
        await connection.getRepository(TargetAudienceEntity).remove(targetAudience);
        isTargetAudienceRemoved = true;
    } catch (error) {
        console.info(`Error in deleteTargetAudienceById: ${error}`);
    }

    return isTargetAudienceRemoved;

}