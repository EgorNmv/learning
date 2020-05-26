import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { Connection } from "typeorm";
import { FormatEntity } from "../../../objects/entities/format/entity";

export const findAllFormats = async (): Promise<FormatEntity[]> => {
    const connection: Connection = await getLocallyConnection();

    return await connection.getRepository(FormatEntity).find();
}