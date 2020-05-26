import { RequestEntity } from "../../../objects/entities/request/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findRequestById = async (id: number): Promise<RequestEntity> => {
    const connection: Connection = await getLocallyConnection();

    return connection.getRepository(RequestEntity).findOne(id);
}