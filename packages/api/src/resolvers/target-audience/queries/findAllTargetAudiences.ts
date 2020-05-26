import { TargetAudienceEntity } from "../../../objects/entities/target-audience/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllTargetAudiences = async (): Promise<TargetAudienceEntity[]> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(TargetAudienceEntity).find();
}