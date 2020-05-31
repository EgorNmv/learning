import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllTargetAudiences = async (
    connection: Connection
): Promise<TargetAudienceEntity[]> => {

    return await connection.getRepository(TargetAudienceEntity).find();
}