import { FormatEntity } from "../../../objects/entities/format/entity";
import { Connection } from "typeorm";
import { findFormatById } from "./findFormatById";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const updateFormatById = async (
    id: number,
    description: string
): Promise<FormatEntity> => {
    const connection: Connection = await getLocallyConnection();
    const format: FormatEntity = await findFormatById(id);

    if (!format) {
        throw new Error(`Format with id:${id} not found`);
    }

    const updatedFormat: FormatEntity = await connection.getRepository(FormatEntity)
        .save({ ...format, description })

    return updatedFormat;
}