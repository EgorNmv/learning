import { FormatEntity } from "../../../objects/entities/format/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findFormatById = async (
    connection: Connection,
    id: number
): Promise<FormatEntity | null> => {
    const format: FormatEntity = await connection.getRepository(FormatEntity).findOne(id);

    if (!format) {
        return null;
    }

    return format;
}