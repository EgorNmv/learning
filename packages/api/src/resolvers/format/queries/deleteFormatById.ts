import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { FormatEntity } from "../../../objects/entities/format/entity";
import { findFormatById } from "./findFormatById";

export const deleteFormatById = async (
    connection: Connection,
    id: number
): Promise<boolean> => {
    const format: FormatEntity = await findFormatById(connection, id);
    let isFormatRemoved: boolean = false;

    if (!format) {
        throw new Error(`Format with id ${id} not found`);
    }

    try {
        await connection.getRepository(FormatEntity).remove(format);
        isFormatRemoved = true;
    } catch (error) {
        console.info(`Error in deleteFormatById: ${error}`);
    }

    return isFormatRemoved;

}