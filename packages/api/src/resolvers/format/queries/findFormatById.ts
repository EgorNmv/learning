import {FormatEntity} from "../../../objects/entities/format/entity";
import {Connection} from "typeorm";
import {getLocallyConnection} from "../../../../../core/src/database-connection/database-connection";

export const findFormatById = async (id: number): Promise<FormatEntity | null> => {
    const connection: Connection = await getLocallyConnection();
    const format: FormatEntity = await connection.getRepository(FormatEntity).findOne(id);

    if (!format) {
        return null;
    }

    return format;
}