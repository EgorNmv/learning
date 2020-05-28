import { Connection } from "typeorm"
import { getLocallyConnection } from "../../../../../core/src/database-connection/database-connection"
import { findRequestById } from "./findRequestById";
import { RequestEntity } from "../../../objects/entities/request/entity";

export const deleteRequestById = async (id: number): Promise<boolean> => {
    const connection: Connection = await getLocallyConnection();
    const request: RequestEntity = await findRequestById(id);
    let isRequestRemoved: boolean = false;

    if (!request) {
        throw new Error(`Request with id ${id} not found`);
    }

    try {
        await connection.getRepository(RequestEntity).remove(request);
        isRequestRemoved = true;
    } catch (error) {
        console.info(`Error in deleteRequestById${error}`);
    }

    return isRequestRemoved;
}