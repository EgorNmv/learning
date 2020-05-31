import {RequestEntity} from "../../../objects/entities/request/entity";
import {Connection} from "typeorm";
import {getLocallyConnection} from "../../../../../core/src/database-connection/database-connection";

export const findRequestById = async (
    id: number
): Promise<RequestEntity | null> => {
    const connection: Connection = await getLocallyConnection();
    const request: RequestEntity = await connection.getRepository(RequestEntity).findOne({
        where: {id},
        relations: ["training"]
    });

    if (!request) {
        return null;
    }

    return request;
}