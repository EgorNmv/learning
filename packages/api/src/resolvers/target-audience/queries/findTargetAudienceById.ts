import {TargetAudienceEntity} from "../../../objects/entities/target-audience/entity";
import {Connection} from "typeorm";
import {getLocallyConnection} from "../../../../../core/src/database-connection/database-connection";

export const findTargetAudienceById = async (
    id: number
): Promise<TargetAudienceEntity | null> => {
    const connection: Connection = await getLocallyConnection();
    const targetAudience: TargetAudienceEntity = await connection
        .getRepository(TargetAudienceEntity).findOne(id);

    if (!targetAudience) {
        return null;
    }

    return targetAudience;
}