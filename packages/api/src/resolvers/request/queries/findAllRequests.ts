import { RequestEntity } from "../../../objects/entities/request/entity";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";

export const findAllRequests = async (
    connection: Connection
): Promise<RequestEntity[]> => {

    return await connection.getRepository(RequestEntity).find({
        relations: ["training"],
        order: { id: "ASC" }
    });
}