import { FormatEntity } from "../../../objects/entities/format/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findFormatById = async (id: number): Promise<FormatEntity> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(FormatEntity).findOne(id);
}