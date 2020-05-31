import { FormatEntity } from "../../../objects/entities/format/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const createFormat = async (
    connection: Connection,
    description: string): Promise<FormatEntity> => {
    const formatFromData: FormatEntity = await connection.getRepository(FormatEntity)
        .save({ description });

    return formatFromData;
}