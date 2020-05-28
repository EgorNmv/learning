import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputRequest } from "../../../objects/input-objects/inputRequest";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { findRequestById } from "./findRequestById";

export const updateRequestById = async (id: number, data: Partial<InputRequest>): Promise<RequestEntity> => {
    const connection: Connection = await getLocallyConnection();
    const request: RequestEntity = await findRequestById(id);

    if (!request) {
        throw new Error(`Request with id ${id} not found`);
    }

    const updatedRequest: RequestEntity = await connection.getRepository(RequestEntity)
        .save({ ...request, ...data });

    return updatedRequest;
}