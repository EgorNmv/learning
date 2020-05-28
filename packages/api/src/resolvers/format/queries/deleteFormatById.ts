import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { FormatEntity } from "../../../objects/entities/format/entity";
import { findFormatById } from "./findFormatById";

export const deleteFormatById = async (id: number): Promise<boolean> => {
    const connection: Connection = await getLocallyConnection();
    const format: FormatEntity = await findFormatById(id);
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