import { FormatEntity } from "../../../objects/entities/format/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const createFormat = async (description: string): Promise<FormatEntity> => {
    const connection: Connection = await getLocallyConnection();

    const formatFromData: FormatEntity = await connection.getRepository(FormatEntity)
        .save({ description });

    return formatFromData;
}