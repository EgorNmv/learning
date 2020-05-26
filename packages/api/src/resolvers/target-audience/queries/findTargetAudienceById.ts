import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findTargetAudienceById = async (id: number): Promise<TargetAudienceEntity> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(TargetAudienceEntity).findOne(id);
}