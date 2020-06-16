import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";
import { FormatEntity } from "../../../objects/entities/format/entity";

export const findAllFormats = async (
    connection: Connection
): Promise<FormatEntity[]> => {

    return await connection.getRepository(FormatEntity).find({ order: { id: "ASC" } });
}