import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection";
import { InputRequest } from "../../../objects/input-objects/inputRequest";
import { RequestEntity } from "../../../objects/entities/request/entity";
import { findRequestById } from "./findRequestById";

export const createRequest = async (data: InputRequest): Promise<RequestEntity> => {
    const connection: Connection = await getLocallyConnection();
    const { id }: RequestEntity = await connection.getRepository(RequestEntity)
        .save({ ...data });
    const newFeedback: RequestEntity = await findRequestById(id);

    return newFeedback;
}